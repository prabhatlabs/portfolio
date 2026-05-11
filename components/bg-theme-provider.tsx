"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { themes } from "@/lib/themes";

interface BgThemeContextType {
    themeIndex: number;
    setThemeIndex: (index: number) => void;
    randomizeTheme: () => void;
}

const BgThemeContext = createContext<BgThemeContextType | undefined>(undefined);

export function BgThemeProvider({
    children,
    initialThemeIndex = 0,
}: {
    children: React.ReactNode;
    initialThemeIndex?: number;
}) {
    const [themeIndex, setThemeIndexState] = useState(initialThemeIndex);

    const setThemeIndex = useCallback((index: number) => {
        setThemeIndexState(index % themes.length);
    }, []);

    const randomizeTheme = useCallback(() => {
        setThemeIndexState(Math.floor(Math.random() * themes.length));
    }, []);

    return (
        <BgThemeContext.Provider value={{ themeIndex, setThemeIndex, randomizeTheme }}>
            {children}
        </BgThemeContext.Provider>
    );
}

export function useBgTheme() {
    const context = useContext(BgThemeContext);
    if (context === undefined) {
        throw new Error("useBgTheme must be used within a BgThemeProvider");
    }
    return context;
}
