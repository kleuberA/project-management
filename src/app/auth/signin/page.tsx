import SignInComponent from "@/components/auth/signin";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Auth | SignIn",
    description: "Page of authentication.",
};

export default function SignIn() {
    return (
        <div className="w-full h-screen bg-[#161616] flex flex-row">
            <div className="flex-1"></div>
            <div className="w-full h-full bg-[#1c1c1c] flex-[0.8] border-l border-l-[#2e2e2e]">
                <SignInComponent />
            </div>
        </div>
    )
}