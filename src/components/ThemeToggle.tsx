"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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
        <span
            onClick={handleToggle}
            className="text-white rounded-full p-0 px-0 py-0 cursor-pointer"
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
        </span>
    );
}
