import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'change-me-in-env'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null
    if (!token) {
      return NextResponse.json({ favorited: false })
    }

    let decoded: any
    try {
      decoded = jwt.verify(token, JWT_SECRET)
    } catch {
      return NextResponse.json({ favorited: false })
    }

    const resource = await db.resource.findUnique({ where: { slug: params.slug } })
    if (!resource) return NextResponse.json({ favorited: false })

    const fav = await db.favorite.findUnique({
      where: { userId_resourceId: { userId: decoded.userId, resourceId: resource.id } }
    })

    return NextResponse.json({ favorited: !!fav })
  } catch (error) {
    return NextResponse.json({ favorited: false })
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const token = authHeader.substring(7)
    let decoded: any
    try {
      decoded = jwt.verify(token, JWT_SECRET)
    } catch {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const resource = await db.resource.findUnique({ where: { slug: params.slug } })
    if (!resource) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const existing = await db.favorite.findUnique({
      where: { userId_resourceId: { userId: decoded.userId, resourceId: resource.id } }
    })

    if (existing) {
      await db.favorite.delete({ where: { userId_resourceId: { userId: decoded.userId, resourceId: resource.id } } })
      return NextResponse.json({ favorited: false })
    }

    await db.favorite.create({ data: { userId: decoded.userId, resourceId: resource.id } })
    return NextResponse.json({ favorited: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to toggle favorite' }, { status: 500 })
  }
}
