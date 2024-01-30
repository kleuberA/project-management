import HeaderMenu from "@/components/headerMenu/Header";
import GetOrganizationById from "@/components/organization/id/getOrganizationById";
import MenuOrganization from "@/components/sideMenu/menuOrganizationTeam/menu";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Organization",
    description: "Page of organization.",
};

export default function Organization({ params }: { params: { id: string } }) {
    return (
        <div className="w-full h-screen">
            <HeaderMenu organizationId={params.id} />
            <div className="flex flex-row">
                <div>
                    <MenuOrganization />
                </div>
                <div className="flex-1">
                    <GetOrganizationById organizationId={params.id} />
                </div>
            </div>
        </div>
    )
}