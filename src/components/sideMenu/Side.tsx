import Link from "next/link";
import { ListItensMenu } from "./ItensMenu";
import Logo from "./LogoSide";

export default function SideMenu() {

    return (
        <section className="h-[calc(100dvh_-_3rem)] w-[17dvw] border-r border-r-border">
            <div className="flex flex-col gap-5">
                <div className="w-full text-center p-5 border-b border-b-border">
                    <Logo />
                </div>
                <div className="w-full">
                    {ListItensMenu.map((item) => (
                        <div key={item.id} className="w-full pb-3 border-b border-b-border pt-3">
                            <div className="w-[85%] mx-auto flex flex-col gap-2">
                                <span className="font-medium font-mono text-xs text-ring">
                                    {item.title}
                                </span>
                                <div>
                                    {item.itens.map((item) => (
                                        <div key={item.id} className="w-full mx-auto">
                                            <Link href={item.path} className="text-sm hover:bg-border p-1 rounded-sm text-accent-foreground font-mono font-medium">
                                                {item.name}
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}