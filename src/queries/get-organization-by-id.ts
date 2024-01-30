import { TypedSupabaseClient } from "@/utils/supabase";

export function getOrganizationById(
    client: TypedSupabaseClient,
    organizationId: string
) {
    return client
        .from('organizations')
        .select()
        .eq('id', organizationId)
        .throwOnError()
        .single();
}