"use client";
import { createContext, ReactNode, useState } from "react";

export type LayoutContextType = {
    layoutOpen: boolean;
    ToggleLayout: () => void;
};

export const layoutContext = createContext<LayoutContextType | null>(null);

const LayoutContextProvider = ({ children }: { children: ReactNode }) => {
    const [isLayoutOpen, setIsLayoutOpen] = useState<boolean>(false);
    const ToggleLayout = () => setIsLayoutOpen((p) => !p);

    return (
        <layoutContext.Provider
            value={{
                layoutOpen: isLayoutOpen,
                ToggleLayout,
            }}
        >
            <div
                data-islayoutopen={isLayoutOpen}
                className="relative data-[islayoutopen=true]:max-w-[1500px] mx-auto"
            >
                {children}
            </div>
        </layoutContext.Provider>
    );
};

export default LayoutContextProvider;
