"use client"

import * as React from "react"
import { DotFilledIcon } from "@radix-ui/react-icons"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()

    return (
        <section className="flex flex-col gap-2 justify-start items-start">
            <Button variant="theme" onClick={() => setTheme("light")} className="flex flex-row items-center gap-1 h-8 justify-start">
                {theme == 'light' && <DotFilledIcon />} Light
            </Button>
            <Button variant="theme" onClick={() => setTheme("dark")} className="gap-1 h-8">
                {theme == 'dark' && <DotFilledIcon />}Dark
            </Button>
            <Button variant="theme" onClick={() => setTheme("system")} className="flex flex-row items-center gap-1 h-8 justify-start">
                {theme == 'system' && <DotFilledIcon />}System
            </Button>
        </section>
    )
}
