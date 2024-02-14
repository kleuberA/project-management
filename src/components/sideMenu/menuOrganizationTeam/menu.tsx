"use client"
import { ItensMenu } from "./itensMenu"
import Logo from "../LogoSide";

export default function MenuOrganization() {
    const menuItensList = ItensMenu;

    return (
        <section className="h-[calc(100dvh_-_3rem)] w-[17dvw] border-r border-r-border">
            <div className="flex flex-col ">
                <div className="w-full text-center p-5 border-b border-b-border">
                    <Logo />
                </div>
                <div className="w-full border-b border-b-border">
                    {menuItensList.map((item) => (
                        <div key={item.id} className="h-full py-2">
                            <div className="w-[80%] mx-auto flex flex-col gap-1">
                                <span className="text-lg hover:bg-border p-2 cursor-pointer flex flex-row gap-2 items-center rounded-sm text-accent-foreground font-mono font-normal">
                                    {item.icon} {item.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    )
}