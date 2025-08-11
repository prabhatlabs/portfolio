"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeBtn() {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className="relative w-fit px-1 py-0.5 rounded-md border border-muted-foreground/30">
            <div className="px-1 py-0.5 flex items-center gap-2">
                <span
                    className={
                        theme === "light"
                            ? "text-primary"
                            : "text-muted-foreground"
                    }
                    onClick={() => setTheme("light")}
                >
                    <Sun className="size-[14px]" />
                </span>
                <span
                    className={
                        theme === "system"
                            ? "text-primary"
                            : "text-muted-foreground"
                    }
                    onClick={() => setTheme("system")}
                >
                    <Monitor className="size-[14px]" />
                </span>
                <span
                    className={
                        theme === "dark"
                            ? "text-primary"
                            : "text-muted-foreground"
                    }
                    onClick={() => setTheme("dark")}
                >
                    <Moon className="size-[14px]" />
                </span>
            </div>
        </div>
    );
}
