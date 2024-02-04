"use client"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, PlusIcon } from "@radix-ui/react-icons";
import { insertProject } from "@/queries/create-project";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useSupabase from "@/hooks/useSupabase";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { z } from "zod";

interface CreateProjectProps {
    id_organization: string | undefined
}

const FormSchema = z.object({
    name: z.string().min(3, { message: "O nome deve ter no minimo 3 caracteres." }),
    planned_start: z.date({
        required_error: "A date of planned start is required.",
    }),
    planned_end: z.date({
        required_error: "A date of planned end is required.",
    }),
    description: z.string()
})

export default function CreateProject({ id_organization }: CreateProjectProps) {

    const supabase = useSupabase();
    const router = useRouter();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    async function onSubmit(dataForm: z.infer<typeof FormSchema>) {

        let dataInsert = {
            id_organization: id_organization as string,
            name: dataForm.name,
            planned_start_date: dataForm.planned_start.toISOString(),
            planned_end_date: dataForm.planned_end.toISOString(),
            description: dataForm.description,
        }

        const queryInsertProject = await insertProject(supabase, dataInsert);

        const { data } = await supabase.from('project')
            .select('id')
            .eq('name', dataForm.name)

        const projectId = data && data[0] && data[0].id;
        console.log(projectId);

        if (projectId) {
            const { error } = await supabase
                .from('organizations')
                .update({ projects: projectId })
                .eq('id', id_organization as string);
            console.log(error);
        }

        if (queryInsertProject) {
            toast.success("Project created successfully!",
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
            toast.error("Error creating project!",
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
                <Button variant="secondary" className="flex gap-1 h-8 text-xs justify-start p-2"><PlusIcon />Create Project</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[650px]">
                <DialogHeader>
                    <DialogTitle className="">Create Project</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Create the project that will be used in your organization
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
                                            <Input placeholder="Name Project" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex flex-row justify-between">
                                <FormField
                                    control={form.control}
                                    name="planned_start"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Date Project Start</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-[240px] pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormDescription>
                                                Project start date.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="planned_end"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Date Project End</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-[240px] pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "PPP")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormDescription>
                                                Project end date
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Description Project" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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