"use client"

import useSupabase from "@/hooks/useSupabase"
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ExitIcon } from "@radix-ui/react-icons";

export default function SignOut() {

    const supabase = useSupabase();
    const router = useRouter();

    function handleClick() {
        supabase.auth.signOut()
        router.push('/auth/signin');
    }

    return (
        <Button variant="logout" onClick={handleClick}>
            <ExitIcon /> Sair
        </Button>
    )
}