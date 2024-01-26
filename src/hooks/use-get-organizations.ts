import { getOrganizations } from "@/queries/get-organizations";
import { useQuery } from "@tanstack/react-query";
import useSupabase from "./useSupabase";

function useGetOrganizationsQuery() {

    const client = useSupabase();
    const queryKey = ['organizations'];

    const queryFn = async () => {
        return getOrganizations(client).then(
            (result) => result.data
        );
    };

    return useQuery({ queryKey, queryFn });
}

export default useGetOrganizationsQuery;