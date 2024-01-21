"use client"

import useSupabase from "@/hooks/useSupabase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SignOut from "../auth/signout";

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
    console.log(userData)

    return (
        <section>
            {userData?.session?.user && (
                <div>
                    <span>{userData?.session.user.user_metadata.first_name}{" "}{userData?.session.user.user_metadata.last_name}</span>
                    <h1>{userData?.session?.user.email}</h1>
                </div>
            )}
            <SignOut />
        </section>
    )
}