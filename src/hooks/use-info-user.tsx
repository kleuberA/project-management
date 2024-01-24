"use client"
import { useEffect, useState } from "react";
import useSupabase from "./useSupabase";
import { CaretSortIcon } from "@radix-ui/react-icons";

function useInfoUser() {
    const supabase = useSupabase();

    const [userData, setUserData] = useState<any>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await supabase.auth.getSession();
                if (data) {
                    setUserData(data);
                }
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();

    }, []);

    return (
        <div>
            <span className="">
                {userData?.session?.user?.user_metadata?.first_name.charAt(0).toUpperCase()}
                {userData?.session?.user?.user_metadata?.first_name.slice(1)} {" "}
                Organization
            </span>
        </div>
    )
}

export default useInfoUser;