"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export function ThemeToggle() {
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

    if (!mounted) {
        return null;
    }

    return (
        <Button
            onClick={handleToggle}
            variant={"outline"}
            size={"icon"}
            className="fixed bottom-0 right-0 m-6 rounded-full text-foreground/70"
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
