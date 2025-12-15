import { NextResponse } from 'next/server'
import { getProjects } from '@/lib/content/loader.server'

export async function GET() {
  try {
    const projects = getProjects()
    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load projects' }, { status: 500 })
  }
}

