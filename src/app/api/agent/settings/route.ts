import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { z } from 'zod'

const settingsSchema = z.object({
  provider: z.string().min(1),
  apiKey: z.string().min(1),
  model: z.string().min(1),
  temperature: z.number().min(0).max(2),
  maxTokens: z.number().min(1).max(4096),
  systemPrompt: z.string().min(1),
  enabled: z.boolean(),
})

export async function GET() {
  try {
    const settings = await db.agentSettings.findFirst({
      orderBy: { createdAt: 'desc' }
    })

    if (!settings) {
      // Return default settings
      return NextResponse.json({
        provider: 'openai',
        apiKey: '',
        model: 'gpt-3.5-turbo',
        temperature: 0.7,
        maxTokens: 2000,
        systemPrompt: `You are Sourcekom Agent, an intelligent assistant for the SourceKom resource sharing and legal consultancy platform in Saudi Arabia. You help users:

1. **Find Resources**: Search and recommend office spaces, equipment, legal services, software, and more
2. **Facilitate Transactions**: Guide users through buying, selling, and booking resources
3. **Legal Guidance**: Provide information about legal services and consultations
4. **User Support**: Help with registration, dashboard navigation, and platform features
5. **Seller Assistance**: Guide sellers through posting items, managing listings, and handling sales

**Key Capabilities**:
- Execute end-to-end workflows (search → select → purchase)
- Display resource details with images, pricing, and availability
- Handle authentication and user onboarding
- Process payments and confirm transactions
- Provide real-time updates and notifications

**Tone**: Professional, helpful, and conversational. Always prioritize user success and seamless transactions.
**Language**: English with Arabic support when requested.
**Context**: Saudi Arabian market focus with cultural and regulatory awareness.

When users want to perform actions (search, buy, sell), guide them through the process step-by-step within the chat interface.`,
        enabled: true
      })
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error('Failed to fetch agent settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch agent settings' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = settingsSchema.parse(body)

    // Delete existing settings
    await db.agentSettings.deleteMany()

    // Create new settings
    const settings = await db.agentSettings.create({
      data: validatedData
    })

    return NextResponse.json({
      message: 'Agent settings updated successfully',
      settings
    })
  } catch (error) {
    console.error('Failed to update agent settings:', error)
    return NextResponse.json(
      { error: 'Failed to update agent settings' },
      { status: 500 }
    )
  }
}
