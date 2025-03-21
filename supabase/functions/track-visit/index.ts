
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    
    // Get visitor counter from DB
    const { data, error } = await supabaseClient
      .from('visitors_counter')
      .select()
      .limit(1)
      .single();
    
    if (error) throw error;
    
    // Increment counter
    const newCount = (data?.count || 0) + 1;
    
    // Update counter in DB
    await supabaseClient
      .from('visitors_counter')
      .update({ count: newCount, last_updated: new Date().toISOString() })
      .eq('id', data.id);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        visitorCount: newCount 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error tracking visit:', error);
    
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
