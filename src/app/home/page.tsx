import HomeContainer from "@/components/homeContainer/Home";
import HeaderMenu from "@/components/headerMenu/Header";
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
            <div className="flex flex-row">
                <div>
                    <SideMenu />
                </div>
                <div className="flex-1">
                    <HomeContainer />
                </div>
            </div>
        </div>
    )
}