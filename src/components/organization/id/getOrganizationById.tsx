"use client"

import useOrganizationByIdQuery from "@/hooks/use-get-organization-by-id";

interface GetOrganizationByIdProps {
    organizationId: string;
}

export default function GetOrganizationById(props: GetOrganizationByIdProps) {

    const { data, error } = useOrganizationByIdQuery(props.organizationId);
    console.log(data);

    return (
        <section>container organization</section>
    )
}