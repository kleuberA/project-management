"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import useSupabase from "@/hooks/useSupabase";
import { ModeToggle } from "../toggle-theme";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SignOut from "../auth/signout";
import { Button } from "../ui/button";

export default function User() {

    const supabase = useSupabase();
    const router = useRouter();

    const [userData, setUserData] = useState<any>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await supabase.auth.getSession();
                if (data) {
                    setUserData(data);
                }
                if (!data.session?.user) {
                    router.push('/auth/signin')
                }
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();

    }, []);

    return (
        <section>
            {userData?.session?.user && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="bg-background text-accent-foreground w-10 h-9 flex items-center justify-center border border-border rounded-sm">
                            {userData?.session?.user?.user_metadata?.first_name.charAt(0).toUpperCase()}
                            {userData?.session?.user?.user_metadata?.last_name.charAt(0).toUpperCase()}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <ModeToggle />
                        <DropdownMenuSeparator />
                        <SignOut />
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </section>
    )
}