import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

const chatSchema = z.object({
  message: z.string().min(1),
  conversationId: z.string().optional(),
  userId: z.string().optional(),
  context: z.object({
    searchQuery: z.string().optional(),
    categoryId: z.string().optional(),
    priceRange: z.object({ min: z.number().optional(), max: z.number().optional() }).optional(),
    currentResource: z.any().optional(),
    userIntent: z.string().optional()
  }).optional()
})

const JWT_SECRET = process.env.JWT_SECRET || "change-me-in-env"

// Function to extract user intent from message
function extractIntent(message: string) {
  const lowerMessage = message.toLowerCase()

  // Search intent
  if (lowerMessage.includes('search') || lowerMessage.includes('find') || lowerMessage.includes('looking for') || lowerMessage.includes('need')) {
    return 'search'
  }

  // Buy/Purchase intent
  if (lowerMessage.includes('buy') || lowerMessage.includes('purchase') || lowerMessage.includes('get') || lowerMessage.includes('interested in')) {
    return 'buy'
  }

  // Sell/Post intent
  if (lowerMessage.includes('sell') || lowerMessage.includes('post') || lowerMessage.includes('list') || lowerMessage.includes('add')) {
    return 'sell'
  }

  // Login/Register intent
  if (lowerMessage.includes('login') || lowerMessage.includes('register') || lowerMessage.includes('sign up') || lowerMessage.includes('account')) {
    return 'auth'
  }

  // Legal services intent
  if (lowerMessage.includes('legal') || lowerMessage.includes('lawyer') || lowerMessage.includes('consultation') || lowerMessage.includes('contract')) {
    return 'legal'
  }

  // Help/Support intent
  if (lowerMessage.includes('help') || lowerMessage.includes('how to') || lowerMessage.includes('support')) {
    return 'help'
  }

  return 'general'
}

// Function to search resources based on query
async function searchResources(query: string, categoryId?: string, priceRange?: { min?: number, max?: number }) {
  const searchConditions: any = {
    isPublished: true,
  }

  if (query) {
    searchConditions.OR = [
      { title: { contains: query, mode: 'insensitive' } },
      { description: { contains: query, mode: 'insensitive' } },
    ]
  }

  if (categoryId) {
    searchConditions.categoryId = categoryId
  }

  if (priceRange) {
    if (priceRange.min !== undefined) {
      searchConditions.price = { ...searchConditions.price, gte: priceRange.min }
    }
    if (priceRange.max !== undefined) {
      searchConditions.price = { ...searchConditions.price, lte: priceRange.max }
    }
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
    take: 10,
    orderBy: [
      { isFeatured: 'desc' },
      { createdAt: 'desc' }
    ]
  })

  return resources
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
        // Invalid token, continue as anonymous user
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

    // Extract user intent
    const userIntent = extractIntent(message)

    // Generate AI response (this would integrate with OpenAI/other providers)
    let aiResponse = ''
    let actions = []
    let data = {}

    // Handle different intents
    switch (userIntent) {
      case 'search':
        const searchQuery = context?.searchQuery || message
        const searchResults = await searchResources(
          searchQuery,
          context?.categoryId,
          context?.priceRange
        )

        aiResponse = `I found ${searchResults.length} resources matching "${searchQuery}". Here are the top results:`

        actions = ['display_search_results']
        data = { searchResults }
        break

      case 'buy':
        aiResponse = `I'd be happy to help you purchase a resource. Based on your interest, I'll guide you through the checkout process. Please make sure you're logged in to proceed with the purchase.`
        actions = ['initiate_purchase']
        data = { requiresAuth: !userId }
        break

      case 'sell':
        aiResponse = `Great! I can help you list a resource on our platform. Let me guide you through the process of creating a new listing. You'll need to provide details about the resource, pricing, and availability.`
        actions = ['start_selling_flow']
        data = { requiresAuth: !userId }
        break

      case 'auth':
        aiResponse = `I can help you with authentication. Would you like to log in to your existing account or create a new account? I'll guide you through the process right here in the chat.`
        actions = ['show_auth_options']
        break

      case 'legal':
        aiResponse = `I can connect you with our legal experts. We offer comprehensive legal services including corporate law, contract review, compliance, and consultations. Would you like to schedule a consultation or learn more about our legal services?`
        actions = ['show_legal_services']
        break

      default:
        aiResponse = `Hello! I'm Sourcekom Agent, your intelligent assistant for the SourceKom platform. I can help you:

🔍 **Find Resources**: Search for office spaces, equipment, legal services, and more
💼 **Make Purchases**: Complete transactions and bookings
📤 **Sell Resources**: List and manage your own resources
⚖️ **Legal Services**: Connect with legal experts and consultants
📊 **Account Help**: Manage your profile and dashboard

What would you like help with today?`
        actions = ['show_help_options']
    }

    // Save conversation (if conversationId provided)
    if (conversationId && userId) {
      await db.conversationMessage.create({
        data: {
          conversationId,
          userId,
          message,
          response: aiResponse,
          intent: userIntent,
          actions,
          data: data as any
        }
      })
    }

    return NextResponse.json({
      response: aiResponse,
      intent: userIntent,
      actions,
      data,
      conversationId,
      requiresAuth: !userId && (userIntent === 'buy' || userIntent === 'sell')
    })

  } catch (error) {
    console.error('Agent chat error:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
}
