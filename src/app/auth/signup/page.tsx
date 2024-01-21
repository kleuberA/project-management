import SignUpComponent from "@/components/auth/signup";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Auth | SignUp",
    description: "Page of authentication.",
};

export default function SignUp() {
    return (
        <section>
            <SignUpComponent />
        </section>
    )
}