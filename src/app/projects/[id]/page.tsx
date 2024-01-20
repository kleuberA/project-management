"use client"
import useProjectQuery from "@/hooks/use-project-query";

export default function ProjectId({ params }: { params: { id: number } }) {
    const {
        data: project,
        isLoading,
        isError
    } = useProjectQuery(params.id);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error</div>;
    }

    return (
        <div>
            <h1>{project?.name}</h1>
            <h1>{project?.description}</h1>
        </div>
    );
}