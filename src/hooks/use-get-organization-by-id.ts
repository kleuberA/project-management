import { getOrganizationById } from "@/queries/get-organization-by-id";
import { useQuery } from "@tanstack/react-query";
import useSupabase from "./useSupabase";

function useOrganizationByIdQuery(organizationId: string) {
    const client = useSupabase();
    const queryKey = ['project', organizationId];

    const queryFn = async () => {
        return getOrganizationById(client, organizationId).then(
            (result) => result.data
        );
    };

    return useQuery({ queryKey, queryFn });
}

export default useOrganizationByIdQuery;