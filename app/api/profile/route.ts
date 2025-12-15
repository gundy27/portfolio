import { NextResponse } from 'next/server'
import { getProfile } from '@/lib/content/loader.server'

export async function GET() {
  try {
    const profile = getProfile()
    return NextResponse.json(profile)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load profile' }, { status: 500 })
  }
}

