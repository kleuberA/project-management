import { UpdateProfileType } from "@/types/update-profile-type";
import { getProfile } from "@/queries/update-profile";
import { useQuery } from "@tanstack/react-query";
import { TypedSupabaseClient } from "@/utils/supabase";

async function useUpdateProfileQuery(client: TypedSupabaseClient, user: UpdateProfileType) {
    console.log(user)
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