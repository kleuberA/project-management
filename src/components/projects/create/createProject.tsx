"use client"
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useSupabase from "@/hooks/useSupabase";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, PlusIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar";

const FormSchema = z.object({
    typeSelect: z.string(),
    name: z.string().min(3, { message: "O nome deve ter no minimo 3 caracteres." }),
    planned_start: z.date({
        required_error: "A date of birth is required.",
    }),
    planned_end: z.date({
        required_error: "A date of birth is required.",
    }),
    description: z.string()
})

export default function CreateProject() {

    const supabase = useSupabase();
    const router = useRouter();
    const [date, setDate] = useState<Date>()

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    async function onSubmit(dataForm: z.infer<typeof FormSchema>) {
        const { data } = await supabase.auth.getSession();

        // let dataInsert = {
        //     name_organization: dataForm.name,
        //     type_organization: dataForm.typeSelect,
        //     plan_organization: dataForm.planSelect,
        //     id_owner: data.session?.user.id as string
        // }
        // const queryInsertOrganization = await insertOrganizations(supabase, dataInsert);

        // if (queryInsertOrganization) {
        //     toast.success("Organization created successfully!",
        //         {
        //             style: {
        //                 borderRadius: '5px',
        //                 background: '#1c1c1c',
        //                 color: '#fff',
        //                 border: '1px solid #2e2e2e'
        //             },
        //         });
        //     router.refresh();
        //     form.reset();
        // } else {
        //     toast.error("Error creating organization!",
        //         {
        //             style: {
        //                 borderRadius: '5px',
        //                 background: '#1c1c1c',
        //                 color: '#fff',
        //                 border: '1px solid #2e2e2e'
        //             },
        //         });
        // }
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
                                                        disabled={(date) =>
                                                            date > new Date() || date < new Date("1900-01-01")
                                                        }
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
                                                        disabled={(date) =>
                                                            date > new Date() || date < new Date("1900-01-01")
                                                        }
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