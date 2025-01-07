import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://wmdkincoyjwvhylgxvqm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtZGtpbmNveWp3dmh5bGd4dnFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU0OTY3ODQsImV4cCI6MjA1MTA3Mjc4NH0.cHscGj-ydQWuPx9J0ve5hE6qwyFOs1YveEmFG_OTdcs'

export const supabase = createClient(supabaseUrl, supabaseKey)

