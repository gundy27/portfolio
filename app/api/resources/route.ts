import { NextResponse } from 'next/server'
import { getResources } from '@/lib/content/loader.server'

export async function GET() {
  try {
    const resources = getResources()
    return NextResponse.json(resources)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load resources' }, { status: 500 })
  }
}

