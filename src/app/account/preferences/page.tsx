import AccountPreferences from "@/components/account/preferences/Preferences";
import HeaderMenu from "@/components/headerMenu/Header";
import SideMenu from "@/components/sideMenu/Side";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Account | Preferences",
    description: "Page of preferences for account.",
};

export default function Preference() {
    return (
        <div className="w-full h-screen">
            <HeaderMenu />
            <div className="flex flex-row">
                <div>
                    <SideMenu />
                </div>
                <div className="flex-1">
                    <AccountPreferences />
                </div>
            </div>
        </div>
    )
}