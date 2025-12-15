import { NextResponse } from 'next/server'
import { getTimelineEvents } from '@/lib/content/loader.server'

export async function GET() {
  try {
    const events = getTimelineEvents()
    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load timeline events' }, { status: 500 })
  }
}

