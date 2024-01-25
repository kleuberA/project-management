import { createBrowserClient } from '@supabase/ssr';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import type { Database } from '@/utils/database.types';

export type TypedSupabaseClient = SupabaseClient<Database>;
let client: TypedSupabaseClient | undefined;

export function getSupabaseBrowserClient() {
    if (client) {
        return client;
    }

    client = createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    );

    return client;
}

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY!, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})

// Access auth admin api
export const adminAuthClient = supabase.auth.admin