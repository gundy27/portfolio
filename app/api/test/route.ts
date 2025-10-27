import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    
    // Test 1: Check Supabase connection
    const connectionTest = {
      timestamp: new Date().toISOString(),
      status: 'connected'
    }
    
    // Test 2: Query profiles table
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .limit(1)
    
    // Test 3: Query all tables
    const tables = [
      'profiles',
      'case_studies',
      'case_study_media',
      'resources',
      'timeline_events',
      'chatbot_logs',
      'page_anchors',
      'media_assets'
    ]
    
    const tableResults = await Promise.all(
      tables.map(async (table) => {
        const { count, error } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true })
        
        return {
          table,
          count: count ?? 0,
          error: error?.message
        }
      })
    )
    
    return NextResponse.json({
      success: true,
      timestamp: connectionTest.timestamp,
      tests: {
        profiles: {
          data: profiles,
          error: profilesError?.message,
          count: profiles?.length ?? 0
        },
        tableCounts: tableResults
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      stack: error.stack
    }, { status: 500 })
  }
}
