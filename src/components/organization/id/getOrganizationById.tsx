"use client"
import CreateProject from "@/components/projects/create/createProject";
import { Button } from "@/components/ui/button";
import useOrganizationByIdQuery from "@/hooks/use-get-organization-by-id";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface GetOrganizationByIdProps {
    organizationId: string;
}

export default function GetOrganizationById(props: GetOrganizationByIdProps) {

    const { data, error } = useOrganizationByIdQuery(props.organizationId);
    console.log(data);

    return (
        <section className="w-full h-full p-4 flex flex-row justify-center items-center">
            {data?.projects === null || data?.projects === undefined ? (
                <div className="w-96 h-44 flex flex-col gap-3 justify-center items-center rounded-md border-2 border-dashed border-border p-2">
                    <span className="font-bold text-yellow-300">
                        <ExclamationTriangleIcon width={20} height={20} />
                    </span>
                    <span className="text-base text-center text-accent-foreground font-mono font-semibold">You do not have any projects in this organization.</span>
                    <CreateProject id_organization={data?.id} />
                </div>
            ) : (
                <div>
                    <h1>Projetos</h1>
                </div>
            )}
        </section>
    )
}