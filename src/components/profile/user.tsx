"use client"

import useSupabase from "@/hooks/useSupabase";
import { useEffect, useState } from "react";
import SignOut from "../auth/signout";
import { useRouter } from "next/navigation";

export default function User() {

    const supabase = useSupabase();
    const router = useRouter();

    const [userData, setUserData] = useState<any>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await supabase.auth.getSession();
                console.log(data.session?.user);
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

    console.log(userData);

    return (
        <section>
            {userData?.session?.user && (
                <div>
                    <span>{userData?.session.user.user_metadata.first_name}</span>
                    <h1>{userData?.session?.user.email}</h1>
                </div>
            )}
            <SignOut />
        </section>
    )
}