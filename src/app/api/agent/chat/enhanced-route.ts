import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import jwt from 'jsonwebtoken'
import { z } from 'zod'
import { OpenAIClient, getFallbackResponse } from '@/lib/openai'
import { createPaymentGateway } from '@/lib/payment/myfatoorah'

const chatSchema = z.object({
  message: z.string().min(1),
  conversationId: z.string().optional(),
  userId: z.string().optional(),
  context: z.object({
    searchQuery: z.string().optional(),
    categoryId: z.string().optional(),
    priceRange: z.object({ min: z.number().optional(), max: z.number().optional() }).optional(),
    currentResource: z.any().optional(),
    userIntent: z.string().optional(),
    action: z.string().optional()
  }).optional()
})

const JWT_SECRET = process.env.JWT_SECRET || "change-me-in-env"

// Enhanced intent extraction with more sophisticated patterns
function extractIntent(message: string): { intent: string; confidence: number; entities: any } {
  const lowerMessage = message.toLowerCase()
  const entities: any = {}

  // Extract entities
  const priceMatch = lowerMessage.match(/(\d+)\s*(sar|riyal|r)/)
  if (priceMatch) {
    entities.price = parseInt(priceMatch[1])
  }

  const locationMatch = lowerMessage.match(/(riyadh|jeddah|dammam|mecca|medina)/)
  if (locationMatch) {
    entities.location = locationMatch[1]
  }

  const categoryMatch = lowerMessage.match(/(office space|equipment|legal|software|storage|vehicle)/)
  if (categoryMatch) {
    entities.category = categoryMatch[1]
  }

  // Intent detection with confidence scoring
  const intents = [
    {
      intent: 'search',
      keywords: ['search', 'find', 'looking for', 'need', 'want', 'show me', 'browse'],
      patterns: [/find.+office/, /search for.+equipment/, /looking for.+legal/, /need.+space/],
      confidence: 0
    },
    {
      intent: 'buy',
      keywords: ['buy', 'purchase', 'get', 'interested in', 'want to buy', 'order'],
      patterns: [/buy.+resource/, /purchase.+service/, /interested in.+office/],
      confidence: 0
    },
    {
      intent: 'sell',
      keywords: ['sell', 'list', 'post', 'share', 'rent out', 'offer'],
      patterns: [/sell.+equipment/, /list.+office/, /share.+resource/],
      confidence: 0
    },
    {
      intent: 'auth',
      keywords: ['login', 'register', 'sign up', 'create account', 'account'],
      patterns: [/sign\s+up/, /create\s+account/, /log\s+in/],
      confidence: 0
    },
    {
      intent: 'legal',
      keywords: ['legal', 'lawyer', 'consultation', 'contract', 'legal advice'],
      patterns: [/legal.+consultation/, /lawyer.+help/, /contract.+review/],
      confidence: 0
    },
    {
      intent: 'help',
      keywords: ['help', 'how to', 'support', 'assist', 'guide'],
      patterns: [/how\s+do\s+i/, /help\s+me/, /what\s+can\s+i\s+do/],
      confidence: 0
    }
  ]

  // Calculate confidence scores
  intents.forEach(intentObj => {
    // Keyword matching
    intentObj.keywords.forEach(keyword => {
      if (lowerMessage.includes(keyword)) {
        intentObj.confidence += 0.3
      }
    })

    // Pattern matching
    intentObj.patterns.forEach(pattern => {
      if (pattern.test(lowerMessage)) {
        intentObj.confidence += 0.5
      }
    })
  })

  // Get best matching intent
  const bestIntent = intents.reduce((best, current) =>
    current.confidence > best.confidence ? current : best
  )

  return {
    intent: bestIntent.confidence > 0.3 ? bestIntent.intent : 'general',
    confidence: bestIntent.confidence,
    entities
  }
}

// Enhanced search with better filtering and ranking
async function enhancedSearch(query: string, categoryId?: string, priceRange?: { min?: number, max?: number }, location?: string) {
  const searchConditions: any = {
    isPublished: true,
  }

  // Build search query
  if (query) {
    searchConditions.OR = [
      { title: { contains: query, mode: 'insensitive' } },
      { description: { contains: query, mode: 'insensitive' } },
      { tags: { hasSome: [query] } }
    ]
  }

  if (categoryId) {
    searchConditions.categoryId = categoryId
  }

  if (priceRange) {
    searchConditions.price = {}
    if (priceRange.min !== undefined) {
      searchConditions.price.gte = priceRange.min
    }
    if (priceRange.max !== undefined) {
      searchConditions.price.lte = priceRange.max
    }
  }

  if (location) {
    searchConditions.location = { contains: location, mode: 'insensitive' }
  }

  const resources = await db.resource.findMany({
    where: searchConditions,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          avatar: true
        }
      },
      category: {
        select: {
          id: true,
          name: true,
          slug: true
        }
      },
      _count: {
        select: {
          reviews: true
        }
      }
    },
    take: 12,
    orderBy: [
      { isFeatured: 'desc' },
      { createdAt: 'desc' }
    ]
  })

  // Calculate ratings and add ranking scores
  const resourcesWithScores = await Promise.all(
    resources.map(async (resource) => {
      const reviews = await db.review.findMany({
        where: { resourceId: resource.id },
        select: { rating: true }
      })

      const averageRating = reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : 0

      // Calculate relevance score
      let score = 0
      if (resource.isFeatured) score += 2
      if (resource.rating >= 4.5) score += 1
      if (reviews.length >= 10) score += 1
      if (resource.price === 0) score += 0.5

      return {
        ...resource,
        averageRating: parseFloat(averageRating.toFixed(1)),
        reviewCount: reviews.length,
        score
      }
    })
  )

  // Sort by relevance score
  return resourcesWithScores.sort((a, b) => b.score - a.score)
}

// Generate AI response with fallback
async function generateAIResponse(message: string, intent: string, entities: any, settings: any, user: any) {
  try {
    // Check if OpenAI is configured
    if (settings.provider === 'openai' && settings.apiKey) {
      const openai = new OpenAIClient({
        apiKey: settings.apiKey,
        model: settings.model,
        temperature: settings.temperature,
        maxTokens: settings.maxTokens
      })

      // Build context-aware system prompt
      const contextPrompt = `${settings.systemPrompt}

Current Context:
- User Intent: ${intent}
- User Entities: ${JSON.stringify(entities)}
- User Status: ${user ? 'Authenticated' : 'Anonymous'}
- Location: Saudi Arabia

Recent Interaction: "${message}"

Respond naturally and helpfully, taking into account the user's intent and current context. If they want to perform actions, guide them through the process clearly.`

      return await openai.generateResponse(contextPrompt, message)
    }
  } catch (error) {
    console.error('AI generation error, using fallback:', error)
  }

  // Fallback response based on intent
  return getFallbackResponse(message, intent)
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization')
    let userId = null

    // Check if user is authenticated
    if (authHeader) {
      try {
        const token = authHeader.replace('Bearer ', '')
        const decoded = jwt.verify(token, JWT_SECRET) as any
        userId = decoded.userId
      } catch (error) {
        console.log('Invalid token, continuing as anonymous user')
      }
    }

    const body = await request.json()
    const { message, conversationId, context } = chatSchema.parse(body)

    // Get agent settings
    const settings = await db.agentSettings.findFirst({
      orderBy: { createdAt: 'desc' }
    })

    if (!settings || !settings.enabled) {
      return NextResponse.json(
        { error: 'Agent is currently disabled' },
        { status: 503 }
      )
    }

    // Extract user intent with confidence
    const { intent, confidence, entities } = extractIntent(message)

    // Generate AI response
    const aiResponse = await generateAIResponse(
      message,
      intent,
      entities,
      settings,
      userId ? { id: userId } : null
    )

    // Determine actions based on intent and context
    let actions = []
    let data = {}

    switch (intent) {
      case 'search':
        const searchResults = await enhancedSearch(
          entities.searchQuery || message,
          entities.category ? (await db.category.findFirst({ where: { name: { contains: entities.category } } }))?.id : undefined,
          entities.price ? { min: 0, max: entities.price } : undefined,
          entities.location
        )

        actions = ['display_search_results']
        data = { searchResults, intent, confidence }
        break

      case 'buy':
        if (context?.currentResource) {
          // Initiate payment flow
          const paymentGateway = createPaymentGateway({
            provider: 'mock', // Will be configurable
            testMode: true
          })

          try {
            const payment = await paymentGateway.initiatePayment({
              amount: context.currentResource.price || 0,
              customerName: user?.name || 'Guest User',
              customerEmail: user?.email || 'guest@example.com',
              callbackUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/callback`,
              errorUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/error`,
              resourceId: context.currentResource.id,
              userId: user?.id,
              description: `Purchase of ${context.currentResource.title}`
            })

            actions = ['show_payment_options']
            data = {
              paymentUrl: payment.Data?.InvoiceURL,
              paymentId: payment.Data?.InvoiceId,
              resource: context.currentResource,
              requiresAuth: !user
            }
          } catch (error) {
            actions = ['payment_error']
            data = { error: 'Payment initialization failed' }
          }
        } else {
          actions = ['select_resource_first']
          data = { requiresAuth: !user }
        }
        break

      case 'sell':
        actions = ['start_selling_flow']
        data = { requiresAuth: !user }
        break

      case 'auth':
        actions = ['show_auth_options']
        data = {}
        break

      case 'legal':
        actions = ['show_legal_services']
        data = {}
        break

      default:
        actions = ['show_help_options']
        data = {}
    }

    // Save conversation if authenticated
    if (conversationId && userId) {
      await db.conversationMessage.create({
        data: {
          conversationId,
          userId,
          message,
          response: aiResponse,
          intent,
          confidence,
          actions,
          data: data as any,
          entities
        }
      })
    }

    return NextResponse.json({
      response: aiResponse,
      intent,
      confidence,
      actions,
      data,
      conversationId,
      requiresAuth: !userId && (intent === 'buy' || intent === 'sell')
    })

  } catch (error) {
    console.error('Enhanced agent chat error:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
}
