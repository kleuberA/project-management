import { CreateOrganizationType } from "@/types/create-organization-type";
import { TypedSupabaseClient } from "@/utils/supabase";

export function insertOrganizations(
    client: TypedSupabaseClient,
    data: CreateOrganizationType
) {
    return client
        .from('organizations')
        .insert({
            name_organization: data.name_organization,
            type_organization: data.type_organization,
            plan_organization: data.plan_organization,
            id_owner: data.id_owner
        })
        .throwOnError()
}