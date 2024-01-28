"use client"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import useSupabase from "@/hooks/useSupabase";
import { insertOrganizations } from "@/queries/create-organization";
import { useRouter } from "next/navigation";
import { useState } from "react";

const FormSchema = z.object({
    typeSelect: z.string(),
    name: z.string().min(3, { message: "O nome deve ter no minimo 3 caracteres." }),
    planSelect: z.string()
})

export default function CreateOrganization() {

    const supabase = useSupabase();
    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    async function onSubmit(dataForm: z.infer<typeof FormSchema>) {
        const { data } = await supabase.auth.getSession();

        let dataInsert = {
            name_organization: dataForm.name,
            type_organization: dataForm.typeSelect,
            plan_organization: dataForm.planSelect,
            id_owner: data.session?.user.id as string
        }
        const queryInsertOrganization = await insertOrganizations(supabase, dataInsert);

        if (queryInsertOrganization) {
            toast.success("Organization created successfully!",
                {
                    style: {
                        borderRadius: '5px',
                        background: '#1c1c1c',
                        color: '#fff',
                        border: '1px solid #2e2e2e'
                    },
                });
            router.refresh();
            form.reset();
        } else {
            toast.error("Error creating organization!",
                {
                    style: {
                        borderRadius: '5px',
                        background: '#1c1c1c',
                        color: '#fff',
                        border: '1px solid #2e2e2e'
                    },
                });
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="createOrganization" className="flex gap-1 h-8 text-xs justify-start p-2"><PlusIcon />Create Organization</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px]">
                <DialogHeader>
                    <DialogTitle className="">Create Organization</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        This is your organization within [Sem nome]. For example, you can use the name of your company.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Name Organization" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-row justify-between">
                                <FormField
                                    control={form.control}
                                    name="typeSelect"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Type Organization</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-[280px]">
                                                        <SelectValue placeholder="Type Organization" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="personal">Personal</SelectItem>
                                                    <SelectItem value="educational">Educational</SelectItem>
                                                    <SelectItem value="startup">Startup</SelectItem>
                                                    <SelectItem value="company">Company</SelectItem>
                                                    <SelectItem value="agency">Agency</SelectItem>
                                                    <SelectItem value="n/a">N/A</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="planSelect"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Plan Organization</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-[280px]">
                                                        <SelectValue placeholder="Plan Organization" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="free">Free 0R$ - Month</SelectItem>
                                                    <SelectItem value="pro">Pro 35R$ - Month</SelectItem>
                                                    <SelectItem value="team">Team 699R$ - Month</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit" variant="secondary" className="w-full">Create</Button>
                        </form>
                    </Form>
                </div>
                <DialogFooter className="">
                    <DialogClose asChild>
                        <Button type="button" variant="primary">
                            Cancel
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}