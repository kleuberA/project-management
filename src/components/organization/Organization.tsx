"use client"

import useInfoUser from "@/hooks/use-info-user"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useState } from "react";
import { CaretSortIcon, CheckIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "../ui/command";
import { cn } from "@/lib/utils";
import CreateOrganization from "./create/CreateOrganization";

const organizations = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
]

export default function Organization() {

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
                    className="w-[200px] justify-between hover:bg-border text-xs border-0 rounded-sm"
                >
                    {value
                        ? organizations.find((organization) => organization.value === value)?.label
                        : user}
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
                        {organizations.map((organization) => (
                            <CommandItem
                                key={organization.value}
                                value={organization.value}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setOpen(false)
                                }}
                            >
                                {organization.label}
                                <CheckIcon
                                    className={cn(
                                        "ml-auto h-4 w-4 text-secondary",
                                        value === organization.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
