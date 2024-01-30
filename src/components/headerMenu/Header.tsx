"use client"
import useOrganizationByIdQuery from "@/hooks/use-get-organization-by-id";
import Organization from "../organization/Organization";
import User from "../profile/user";

interface HeaderProps {
    visiblyOrganization?: boolean;
    organizationId?: string;
}

export default function HeaderMenu({ visiblyOrganization, organizationId }: HeaderProps) {

    const { data, error } = useOrganizationByIdQuery(organizationId as string);
    console.log(data);

    return (
        <section className="w-full h-12 border-b border-b-border">
            <div className="w-[90dvw] h-full mx-auto flex flex-row justify-between items-center">
                <div>
                    {visiblyOrganization && <Organization />}
                    {!visiblyOrganization && organizationId && (
                        <div className="flex items-center flex-row gap-1">
                            <h1 className="text-accent-foreground text-base font-medium uppercase">
                                {data?.name_organization}
                            </h1>
                            <span className="border border-secondary bg-secondary/30 px-2 text-xs rounded-sm">{data?.plan_organization}</span>
                        </div>
                    )}
                </div>
                <div>
                    <User />
                </div>
            </div>
        </section>
    )
}