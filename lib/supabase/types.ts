export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          headline: string
          bio: string
          email: string
          profile_image_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          headline: string
          bio: string
          email: string
          profile_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          headline?: string
          bio?: string
          email?: string
          profile_image_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      case_studies: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          problem: string
          solution: string
          results: string
          technologies: string[]
          project_url: string | null
          pricing_info: Json | null
          featured: boolean
          published: boolean
          display_order: number
          thumbnail_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          problem: string
          solution: string
          results: string
          technologies?: string[]
          project_url?: string | null
          pricing_info?: Json | null
          featured?: boolean
          published?: boolean
          display_order?: number
          thumbnail_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          problem?: string
          solution?: string
          results?: string
          technologies?: string[]
          project_url?: string | null
          pricing_info?: Json | null
          featured?: boolean
          published?: boolean
          display_order?: number
          thumbnail_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      case_study_media: {
        Row: {
          id: string
          case_study_id: string
          media_type: 'image' | 'video' | 'gif' | 'audio'
          url: string
          caption: string | null
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          case_study_id: string
          media_type: 'image' | 'video' | 'gif' | 'audio'
          url: string
          caption?: string | null
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          case_study_id?: string
          media_type?: 'image' | 'video' | 'gif' | 'audio'
          url?: string
          caption?: string | null
          display_order?: number
          created_at?: string
        }
      }
      resources: {
        Row: {
          id: string
          title: string
          description: string
          resource_type: 'template' | 'document' | 'code' | 'video' | 'other'
          file_url: string | null
          external_link: string | null
          thumbnail_url: string | null
          download_count: number
          tags: string[]
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          resource_type: 'template' | 'document' | 'code' | 'video' | 'other'
          file_url?: string | null
          external_link?: string | null
          thumbnail_url?: string | null
          download_count?: number
          tags?: string[]
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          resource_type?: 'template' | 'document' | 'code' | 'video' | 'other'
          file_url?: string | null
          external_link?: string | null
          thumbnail_url?: string | null
          download_count?: number
          tags?: string[]
          published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      timeline_events: {
        Row: {
          id: string
          title: string
          company: string | null
          description: string
          event_type: 'work' | 'education' | 'achievement' | 'project'
          start_date: string
          end_date: string | null
          location: string | null
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          company?: string | null
          description: string
          event_type: 'work' | 'education' | 'achievement' | 'project'
          start_date: string
          end_date?: string | null
          location?: string | null
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          company?: string | null
          description?: string
          event_type?: 'work' | 'education' | 'achievement' | 'project'
          start_date?: string
          end_date?: string | null
          location?: string | null
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      chatbot_logs: {
        Row: {
          id: string
          session_id: string
          user_message: string
          bot_response: string
          sources_cited: Json | null
          user_metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          session_id: string
          user_message: string
          bot_response: string
          sources_cited?: Json | null
          user_metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          session_id?: string
          user_message?: string
          bot_response?: string
          sources_cited?: Json | null
          user_metadata?: Json | null
          created_at?: string
        }
      }
      page_anchors: {
        Row: {
          id: string
          page_path: string
          anchor_id: string
          section_title: string
          content_summary: string
          metadata: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          page_path: string
          anchor_id: string
          section_title: string
          content_summary: string
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          page_path?: string
          anchor_id?: string
          section_title?: string
          content_summary?: string
          metadata?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      media_assets: {
        Row: {
          id: string
          filename: string
          storage_path: string
          url: string
          media_type: 'image' | 'video' | 'gif' | 'audio' | 'document'
          mime_type: string
          size_bytes: number
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          filename: string
          storage_path: string
          url: string
          media_type: 'image' | 'video' | 'gif' | 'audio' | 'document'
          mime_type: string
          size_bytes: number
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          filename?: string
          storage_path?: string
          url?: string
          media_type?: 'image' | 'video' | 'gif' | 'audio' | 'document'
          mime_type?: string
          size_bytes?: number
          metadata?: Json | null
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

