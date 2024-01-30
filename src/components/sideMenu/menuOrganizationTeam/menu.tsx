import { ItensMenu } from "./itensMenu"
import Logo from "../LogoSide";

export default function MenuOrganization() {
    const menuItensList = ItensMenu;

    return (
        <section className="h-[calc(100dvh_-_3rem)] w-[10dvw] border-r border-r-border">
            <div className="flex flex-col gap-5">
                <div className="w-full text-center p-5 border-b border-b-border">
                    <Logo />
                </div>
                <div className="w-full">
                    {menuItensList.map((item) => (
                        <div key={item.id} className="w-full pb-3 flex items-center border-b border-b-border">
                            <div className="w-[80%] mx-auto flex flex-col gap-2">
                                <span className="text-base hover:bg-border p-2 cursor-pointer justify-center flex flex-row gap-2 items-center rounded-sm text-accent-foreground font-mono font-medium">
                                    {item.icon} {item.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}