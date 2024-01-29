"use client"

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import CreateOrganization from "./create/CreateOrganization";
import useOrganizations from "@/hooks/useOrganizations";
import useInfoUser from "@/hooks/use-info-user"
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Organization() {

    const [DataOrganization, setDataOrganization] = useState<any>();
    const organizationsData = useOrganizations();

    useEffect(() => {
        setDataOrganization(organizationsData);
    }, [organizationsData]);

    const user = useInfoUser();
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className=" justify-between hover:bg-border text-xs border-0 rounded-sm"
                >
                    {value
                        ? value
                        : 'No Select Organization'}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search organization..." className="h-9" />
                    <CommandEmpty>No organization found.</CommandEmpty>
                    <CommandGroup>
                        <CommandItem className="hover:bg-transparent text-xs bg-transparent p-0">
                            <CreateOrganization />
                        </CommandItem>
                        {organizationsData?.map((organization: any) => (
                            <Link href={`/organization/${organization.id}`} className="cursor-pointer">
                                <CommandItem
                                    className="cursor-pointer"
                                    key={organization.id}
                                    value={organization.name_organization.toUppercase}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue);
                                        setOpen(false);
                                    }}
                                >
                                    {organization.name_organization}
                                    <CheckIcon
                                        className={cn(
                                            "ml-auto h-4 w-4 text-secondary",
                                            value === organization.name_organization ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            </Link>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
