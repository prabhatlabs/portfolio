"use client";

import { Speaker } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export function CrazyBtn({ className }: { className?: string }) {
    const [mounted, setMounted] = useState(false);
    const route = useRouter();

    const handleClick = () => {
        route.push("/crazy");
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <Button
            size={"icon"}
            variant={"outlineBold"}
            title="Ctrl + ,"
            className={cn(className, "bg-background text-foreground")}
            onClick={handleClick}
        >
            <Speaker />
        </Button>
    );
}
