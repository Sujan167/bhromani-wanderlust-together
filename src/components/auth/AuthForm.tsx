
import { supabase, getAuthRedirectURL } from '@/integrations/supabase/client';

// In your handleSubmit function, update the signup and signin methods
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    emailRedirectTo: getAuthRedirectURL(),
    data: {
      full_name: name,
      phone: phone,
    },
  },
});

// Similar for signInWithPassword
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
  options: {
    persistSession: true,
  },
});
