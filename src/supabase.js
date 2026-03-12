import { createClient } from '@supabase/supabase-js'
 
const SUPABASE_URL = 'https://wkffzefvfolyjyrlwojd.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrZmZ6ZWZ2Zm9seWp5cmx3b2pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwNTc2NDAsImV4cCI6MjA4ODYzMzY0MH0.bIA3h3h4ULjVksO1JDt_lhRiJMW-_OWBm-SX9RQ6cUs'
 
export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
 
