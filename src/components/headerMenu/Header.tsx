import Organization from "../organization/Organization";
import User from "../profile/user";

export default function HeaderMenu() {
    return (
        <section className="w-full h-12 border-b border-b-border">
            <div className="w-[90dvw] h-full mx-auto flex flex-row justify-between items-center">
                <div>
                    <Organization />
                </div>
                <div>
                    <User />
                </div>
            </div>
        </section>
    )
}