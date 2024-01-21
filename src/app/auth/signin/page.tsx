import SignInComponent from "@/components/auth/signin";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Auth | SignIn",
    description: "Page of authentication.",
};

export default function SignIn() {
    return (
        <section>
            <SignInComponent />
        </section>
    )
}