"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function ThemeToggle({ className }: { className?: string }) {
    const { setTheme, theme, systemTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    const handleToggle = () => {
        if (theme === "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        const handleListener = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === ",") handleToggle();
        };
        addEventListener("keydown", handleListener);
        return () => {
            removeEventListener("keydown", handleListener);
        };
    }, [mounted, theme, handleToggle]);

    if (!mounted) {
        return null;
    }

    return (
        <Button
            variant={"ghost"}
            size={"icon"}
            title="Ctrl + ,"
            className={className}
            onClick={handleToggle}
        >
            {theme === "system" ? (
                systemTheme === "dark" ? (
                    <Moon className="size-5" />
                ) : (
                    <Sun className="size-5" />
                )
            ) : theme === "light" ? (
                <Moon className="size-5" />
            ) : (
                <Sun className="size-5" />
            )}
        </Button>
    );
}
