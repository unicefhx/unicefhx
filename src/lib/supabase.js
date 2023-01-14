import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pbopkhmfwnwfpifrxvcy.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBib3BraG1md253ZnBpZnJ4dmN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzM2NzY1NDgsImV4cCI6MTk4OTI1MjU0OH0.kg5Gox_WIYfAn5YrA9TNuP2QlZxWhR1-zn5zxYYoDd4";

export const supabase = createClient(supabaseUrl, supabaseKey);
