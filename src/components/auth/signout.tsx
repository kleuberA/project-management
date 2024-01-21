"use client"

import useSupabase from "@/hooks/useSupabase"
import { useRouter } from "next/navigation";

export default function SignOut() {

    const supabase = useSupabase();
    const router = useRouter();

    function handleClick() {
        supabase.auth.signOut()
        router.push('/auth/signin');
    }

    return (
        <button onClick={handleClick}>Logout</button>
    )
}