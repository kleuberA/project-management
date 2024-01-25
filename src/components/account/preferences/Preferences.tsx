"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useSupabase from "@/hooks/useSupabase";
import { adminAuthClient } from "@/utils/supabase";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const schema = z.object({
    name: z.string().min(3, { message: "O nome deve ter no minimo 3 caracteres." }),
    lastName: z.string().min(4, { message: "O Sobrenome deve ter no minimo 4 caracteres." }),
    email: z.string().email({ message: "Email inválido." }),
});

type UserFormData = z.infer<typeof schema>

export default function AccountPreferences() {

    const supabase = useSupabase();
    const [idUser, setIdUser] = useState<string | any>();
    const [isLoaded, setIsLoaded] = useState(false);
    const [lastSignIn, setLastSignIn] = useState<string | any>();
    const [createdAt, setCreatedAt] = useState<string | any>();

    useEffect(() => {
        async function fetchData() {
            let user = await supabase.auth.getSession();
            console.log(user.data.session?.user.created_at)
            setLastSignIn(`${user.data.session?.user.last_sign_in_at?.slice(0, 10).split("-").reverse().join("/")} as ${user.data.session?.user.last_sign_in_at?.slice(11, 20)}`)
            setCreatedAt(`${user.data.session?.user.created_at?.slice(0, 10).split("-").reverse().join("/")} as ${user.data.session?.user.created_at?.slice(11, 20)}`);
            setIdUser(user.data.session?.user.id);
            setIsLoaded(true);
        }
        fetchData();
    }, [supabase]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<UserFormData>({
        resolver: zodResolver(schema),
    });

    async function submitHandler(dataForm: UserFormData) {
        const { data: user, error } = await adminAuthClient.updateUserById(
            idUser,
            { user_metadata: { first_name: dataForm.name, last_name: dataForm.lastName } }
        )

        if (user) {
            toast.success('User updated successfully!',
                {
                    style: {
                        borderRadius: '5px',
                        background: '#1c1c1c',
                        color: '#fff',
                        border: '1px solid #2e2e2e'
                    },
                });
            reset();
        }
        if (error) {
            toast.error(error?.message + '!' || 'Error updating user!',
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
        <section className="w-full h-[calc(100dvh_-_3rem)]">
            <div className="p-5 w-full h-full">
                <span className="text-accent-foreground font-mono font-semibold text-xs">Preferences</span>
                <div className="flex flex-col gap-5 w-full pt-5">
                    <div className="flex flex-row gap-5">
                        <div className="w-[50dvw] border border-border rounded-sm bg-background">
                            <div className="p-3 border-b border-border w-full">
                                <h1 className="text-accent-foreground font-mono text-lg font-bold">Informations Account</h1>
                            </div>
                            <form onSubmit={handleSubmit(submitHandler)} className="p-4 flex flex-col gap-3" >
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor='firstName' className='text-[#6e6e6e] font-mono'>First Name</Label>
                                    <Input id='firstName' type="text" placeholder='John' {...register('name')} className={`${errors.name?.message && 'border-[#d25151] bg-[#d25151] bg-opacity-20 transition-all duration-200'}`} />
                                    {errors.name?.message && <span className='text-xs text-[#d25151]'>{errors.name?.message}</span>}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor='lastName' className='text-[#6e6e6e] font-mono'>Last Name</Label>
                                    <Input placeholder='Doe' id='lastName' type="text" {...register('lastName')} className={`${errors.lastName?.message && 'border-[#d25151] bg-[#d25151] bg-opacity-20 transition-all duration-200'}`} />
                                    {errors.lastName?.message && <span className='text-xs text-[#d25151]'>{errors.lastName?.message}</span>}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <Label htmlFor='email' className='text-[#6e6e6e]'>Email</Label>
                                    <Input
                                        {...register('email')}
                                        type='email'
                                        placeholder='youemail@example.com'
                                        id='email'
                                        className={`${errors.email?.message && 'border-[#d25151] bg-[#d25151] bg-opacity-20 transition-all duration-200'}`} />
                                    {errors.email?.message &&
                                        <span
                                            className='text-xs text-[#d25151]'
                                        >
                                            {errors.email?.message}
                                        </span>
                                    }
                                </div>
                                <div className="flex justify-end gap-3">
                                    <Button variant="primary" className="w-24" disabled>Cancel</Button>
                                    <Button type="submit" variant="secondary" className="w-24" >Save</Button>
                                </div>
                            </form>
                        </div>
                        <div className="w-[25dvw] h-52 border border-border rounded-sm bg-background">
                            <div className="border-b-border border-b p-3 flex flex-row gap-3 items-center">
                                <div className="bg-secondary rounded-full w-2 h-2 shadow-md animate-pulse shadow-secondary"></div>
                                <span className="text-accent-foreground text-sm font-mono">Activity</span>
                            </div>
                            <div className="p-3">
                                <span className="text-xs font-mono text-accent-foreground">Last Sign In {lastSignIn}</span>
                            </div>
                            <div className="border-b-border border-b p-3 flex flex-row gap-3 items-center">
                                <div className="bg-secondary rounded-full w-2 h-2 shadow-md animate-pulse shadow-secondary"></div>
                                <span className="text-accent-foreground text-sm font-mono">Created</span>
                            </div>
                            <div className="p-3">
                                <span className="text-xs font-mono text-accent-foreground">Created in {createdAt}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}