"use client"
import CreateOrganization from "../organization/create/CreateOrganization";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { OrganizationType } from "@/types/Organization-type";
import useOrganizations from "@/hooks/useOrganizations"
import CardOrganization from "./CardOrganization";
import { Button } from "../ui/button";
import Link from "next/link";

export default function HomeContainer() {

    const organizationsData = useOrganizations();

    return (
        <section className="w-full h-full p-4 flex flex-row justify-center items-center">
            {organizationsData?.length === 0 && (
                <div className="w-96 h-44 flex flex-col gap-3 justify-center items-center rounded-md border-2 border-dashed border-border p-2">
                    <span className="font-bold text-yellow-300">
                        <ExclamationTriangleIcon width={20} height={20} />
                    </span>
                    <span className="text-sm text-accent-foreground font-mono font-semibold">You don't have any organization.</span>
                    <Button variant="secondary">
                        <CreateOrganization />
                    </Button>
                </div>
            )}
            {organizationsData?.length !== 0 && (
                <div className="flex w-full h-full">
                    <div className="flex flex-col gap-4 w-full h-full">
                        <div>
                            <h1 className="text-2xl font-bold font-mono text-accent-foreground">Your Organizations</h1>
                        </div>
                        <div className="flex flex-row gap-3">
                            {organizationsData?.map((organization: OrganizationType, index: number) => (
                                <Link key={index} href={`/organization/${organization.id}`}>
                                    <CardOrganization organization={organization} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}