import { getProjectById } from "@/queries/get-project-by-id";
import { useQuery } from "@tanstack/react-query";
import useSupabase from "./useSupabase";

function useProjectQuery(projectId: number) {
    const client = useSupabase();
    const queryKey = ['project', projectId];

    const queryFn = async () => {
        return getProjectById(client, projectId).then(
            (result) => result.data
        );
    };

    return useQuery({ queryKey, queryFn });
}

export default useProjectQuery;