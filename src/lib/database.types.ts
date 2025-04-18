
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
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          created_at: string
          updated_at: string | null
        }
        Insert: {
          id: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string | null
        }
        Update: {
          id?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string | null
        }
      }
      groups: {
        Row: {
          id: string
          name: string
          description: string | null
          cover_image: string | null
          created_at: string
          created_by: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          cover_image?: string | null
          created_at?: string
          created_by: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          cover_image?: string | null
          created_at?: string
          created_by?: string
        }
      }
      group_members: {
        Row: {
          id: string
          group_id: string
          user_id: string
          role: string
          created_at: string
        }
        Insert: {
          id?: string
          group_id: string
          user_id: string
          role: string
          created_at?: string
        }
        Update: {
          id?: string
          group_id?: string
          user_id?: string
          role?: string
          created_at?: string
        }
      }
      trips: {
        Row: {
          id: string
          name: string
          description: string | null
          location: string
          start_date: string
          end_date: string
          cover_image: string | null
          created_at: string
          created_by: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          location: string
          start_date: string
          end_date: string
          cover_image?: string | null
          created_at?: string
          created_by: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          location?: string
          start_date?: string
          end_date?: string
          cover_image?: string | null
          created_at?: string
          created_by?: string
        }
      }
      // Add more table types as needed
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
