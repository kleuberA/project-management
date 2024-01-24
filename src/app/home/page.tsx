import HeaderMenu from "@/components/headerMenu/Header";
import User from "@/components/profile/user";
import SideMenu from "@/components/sideMenu/Side";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home",
    description: "Page of home aplication.",
};

export default function HomePage() {
    return (
        <div className="w-full h-screen">
            <HeaderMenu />
            <SideMenu />
        </div>
    )
}