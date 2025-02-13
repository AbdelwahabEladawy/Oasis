
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://jbrgahnzynistyrhcvpu.supabase.co'
const supabaseKey =" eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpicmdhaG56eW5pc3R5cmhjdnB1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkyOTc5OTksImV4cCI6MjA1NDg3Mzk5OX0.SSbnkvNXBVmb1AyILGcM_eBagedgH_A52n_3Ku70d-c"
const supabase = createClient(supabaseUrl, supabaseKey)







export default supabase;