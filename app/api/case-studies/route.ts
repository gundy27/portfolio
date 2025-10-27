import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from('case_studies')
      .select('*')
      .eq('published', true)
      .order('display_order', { ascending: true })
    
    if (error) throw error
    
    return NextResponse.json({ data, error: null })
  } catch (error: any) {
    return NextResponse.json(
      { data: null, error: error.message },
      { status: 500 }
    )
  }
}
