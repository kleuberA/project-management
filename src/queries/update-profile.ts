import { UpdateProfileType } from "@/types/update-profile-type";
import { TypedSupabaseClient } from "@/utils/supabase";

export function getProfile(
  client: TypedSupabaseClient,
  user: UpdateProfileType
) {
  console.log(user);
  return client
    .from('profiles')
    .insert([
      {
        first_name: user.first_name,
        last_name: user.last_name,
        user_id: user.user_id,
      },
    ])
    .throwOnError()
    .single();
}