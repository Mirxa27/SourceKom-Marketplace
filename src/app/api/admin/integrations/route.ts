import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import jwt from 'jsonwebtoken'
import { z } from 'zod'

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-env'

// Validate admin access
async function validateAdmin(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }

  const token = authHeader.substring(7)
  try {
    const decoded: any = jwt.verify(token, JWT_SECRET)
    const user = await db.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, email: true, role: true }
    })

    if (!user || (user.role !== 'ADMIN' && user.role !== 'CREATOR')) {
      return null
    }

    return user
  } catch {
    return null
  }
}

// GET: Fetch all integration settings (secrets masked)
export async function GET(request: NextRequest) {
  const user = await validateAdmin(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const settings = await db.integrationSetting.findMany({
      orderBy: { category: 'asc' }
    })

    // Mask secret values
    const maskedSettings = settings.map(setting => ({
      ...setting,
      value: setting.isSecret && setting.value ? '********' : setting.value
    }))

    return NextResponse.json({ settings: maskedSettings })
  } catch (error) {
    console.error('Failed to fetch integration settings:', error)
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

// PUT: Upsert integration settings
const settingSchema = z.object({
  key: z.string().min(1),
  value: z.string().optional(),
  isSecret: z.boolean().default(false),
  category: z.string().optional(),
  description: z.string().optional()
})

const putSchema = z.object({
  settings: z.array(settingSchema)
})

export async function PUT(request: NextRequest) {
  const user = await validateAdmin(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { settings } = putSchema.parse(body)

    // Upsert each setting
    for (const setting of settings) {
      await db.integrationSetting.upsert({
        where: { key: setting.key },
        update: {
          value: setting.value,
          isSecret: setting.isSecret,
          category: setting.category,
          description: setting.description
        },
        create: {
          key: setting.key,
          value: setting.value,
          isSecret: setting.isSecret,
          category: setting.category,
          description: setting.description
        }
      })
    }

    return NextResponse.json({ success: true, message: 'Settings updated successfully' })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request data', details: error.issues }, { status: 400 })
    }
    console.error('Failed to update integration settings:', error)
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}

// POST: Test specific integration connectivity
export async function POST(request: NextRequest) {
  const user = await validateAdmin(request)
  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { integration } = await request.json()

    if (integration === 'supabase') {
      // Test Supabase connection via Prisma
      await db.$queryRaw`SELECT 1`
      return NextResponse.json({ success: true, message: 'Supabase connection successful' })
    }

    if (integration === 'myfatoorah') {
      // Test MyFatoorah API
      const apiKey = process.env.MYFATOORAH_API_KEY || 
        (await db.integrationSetting.findUnique({ where: { key: 'MYFATOORAH_API_KEY' } }))?.value

      if (!apiKey) {
        return NextResponse.json({ success: false, message: 'MyFatoorah API key not configured' }, { status: 400 })
      }

      const baseUrl = process.env.MYFATOORAH_BASE_URL || 'https://apitest.myfatoorah.com'
      const response = await fetch(`${baseUrl}/v2/InitiateSession`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ CustomerIdentifier: 'test' })
      })

      if (response.ok) {
        return NextResponse.json({ success: true, message: 'MyFatoorah connection successful' })
      } else {
        const errorData = await response.json().catch(() => ({}))
        return NextResponse.json({ 
          success: false, 
          message: 'MyFatoorah connection failed', 
          details: errorData 
        }, { status: 400 })
      }
    }

    return NextResponse.json({ error: 'Unknown integration' }, { status: 400 })
  } catch (error) {
    console.error('Integration test failed:', error)
    return NextResponse.json({ error: 'Test failed', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}
