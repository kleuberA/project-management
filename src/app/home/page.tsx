import User from "@/components/profile/user";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Home",
    description: "Page of home aplication.",
};

export default function HomePage() {
    return (
        <div>
            <User />
        </div>
    )
}