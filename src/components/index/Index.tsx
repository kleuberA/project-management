"use client"
import { TextGenerateEffect } from "../text-generate-effect";
import { Spotlight } from "../spot-light";
import { Button } from "../ui/button";
import { motion } from "framer-motion";

export default function ContainerIndex() {
    const words = "Your platform for quick and efficient project management."

    return (
        <div
            className="h-screen w-full dark:bg-black bg-white overflow-hidden dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, translateX: 1000 }}
                animate={{ opacity: 1, translateX: 1 }}
                transition={{ duration: 1 }}
                className="absolute top-5 right-5 z-20 flex flex-row gap-3">
                <Button variant="primary" className="">SignIn</Button>
                <Button variant="secondary" >SignUp</Button>
            </motion.div>
            <Spotlight
                className="-top-40 left-0 md:left-60 md:-top-20"
                fill="white"
            />
            <div className="absolute pointer-events-none inset-0 flex flex-col items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <TextGenerateEffect words={words} className="" />
        </div>
    )
}