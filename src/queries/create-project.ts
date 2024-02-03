import { CreateProjectType } from "@/types/create-project-type";
import { TypedSupabaseClient } from "@/utils/supabase";

export function insertProject(
    client: TypedSupabaseClient,
    data: CreateProjectType
) {
    return client
        .from('project')
        .insert({
            id_organization: data.id_organization,
            name: data.name,
            planned_start_date: data.planned_start_date,
            planned_end_date: data.planned_end_date,
            description: data.description
        })
        .throwOnError()
}