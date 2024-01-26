import { UpdateProfileType } from "@/types/update-profile-type";
import { TypedSupabaseClient } from "@/utils/supabase";
import { getProfile } from "@/queries/update-profile";

async function useUpdateProfileQuery(client: TypedSupabaseClient, user: UpdateProfileType) {
    const queryKey = ['profiles', user];

    const queryFn = async () => {
        return getProfile(client, user).then(
            (result) => result.data
        );
    };
    console.log(queryFn);
    console.log(queryKey)
    return { queryKey, queryFn };
}

export default useUpdateProfileQuery;