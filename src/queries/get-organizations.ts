import { TypedSupabaseClient } from "@/utils/supabase";

export function getOrganizations(
    client: TypedSupabaseClient,
) {
    return client
        .from('organizations')
        .select()
        .throwOnError()
}