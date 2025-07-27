import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(`
    Missing Supabase credentials. Please set:
    - VITE_SUPABASE_URL
    - VITE_SUPABASE_ANON_KEY
    in your environment variables.
  `)
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
