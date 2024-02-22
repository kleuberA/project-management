import { OrganizationType } from "@/types/Organization-type";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

type CardOrganizationType = {
    organization: OrganizationType
}

const CardOrganization = ({ organization }: CardOrganizationType) => {
    return (
        <div className="text-accent-foreground">
            <TiltCard organization={organization} />
        </div>
    );
};

const ROTATION_RANGE = 32.5;
const HALF_ROTATION_RANGE = 32.5 / 2;

const TiltCard = ({ organization }: CardOrganizationType) => {
    const ref = useRef<HTMLDivElement | null>(null);

    const [rotateX, setRotateX] = useState(0);
    const [rotateY, setRotateY] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
        const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

        const rY = mouseX / width - HALF_ROTATION_RANGE;
        const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;

        setRotateX(rX);
        setRotateY(rY);
    };

    const handleMouseLeave = () => {
        if (!ref.current) return;
        setRotateX(0);
        setRotateY(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
            }}
            animate={{
                rotateX,
                rotateY,
            }}
            className="relative flex h-48 w-72 rounded-xl bg-border/50"
        >
            <div
                style={{
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                }}
                className="absolute inset-2 flex flex-col p-2 rounded-xl h-44 bg-border shadow-lg"
            >
                <div
                    style={{
                        transform: "translateZ(50px)",
                    }}
                    className="flex flex-col gap-2 w-full h-full items-start">
                    <div className="flex flex-row w-full justify-between">
                        {organization.plan_organization === "free" && (
                            <div className="h-6 p-2 bg-primary flex border border-border items-center justify-center rounded-sm">
                                <span
                                    style={{
                                        transform: "translateZ(50px)",
                                    }}
                                    className="text-xs uppercase">{organization.plan_organization}</span>
                            </div>
                        )}
                        {organization.plan_organization === "pro" && (
                            <div className="h-6 p-2 bg-secondary/50 text-secondary flex border border-secondary items-center justify-center rounded-sm">
                                <span
                                    style={{
                                        transform: "translateZ(50px)",
                                    }}
                                    className="text-xs uppercase">{organization.plan_organization}</span>
                            </div>
                        )}
                        {organization.plan_organization === "team" && (
                            <div className="h-6 p-2 bg-emerald-500/50 text-emerald-500 flex border border-emerald-500 items-center justify-center rounded-sm">
                                <span className="text-xs uppercase">{organization.plan_organization}</span>
                            </div>
                        )}
                        <div style={{
                            transform: "translateZ(50px)",
                        }}>
                            <div className="flex flex-row gap-2">
                                <div className="h-6 p-2 bg-primary flex border border-border items-center justify-center rounded-sm">
                                    <span className="text-xs uppercase">{organization.type_organization}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-xs text-accent-foreground">Name Organization</span>
                        <p
                            style={{
                                transform: "translateZ(50px)",
                            }}
                            className="text-accent-foreground text-base font-semibold whitespace-normal w-64 text-ellipsis overflow-hidden"
                        >
                            {organization.name_organization}
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CardOrganization;