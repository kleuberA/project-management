import { TypedSupabaseClient } from "@/utils/supabase";

export function getProjectById(
  client: TypedSupabaseClient,
  projectId: number
) {
  return client
    .from('project')
    .select(`
        id,
        name,
        description
      `)
    .eq('id', projectId)
    .throwOnError()
    .single();
}