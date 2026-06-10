"use client"

import {
    HeroDitheringRoot,
    HeroDitheringVisual,
} from "@/components/ui/hero-dithering";
import { useTheme } from "next-themes";

export function Footer() {
    const { resolvedTheme } = useTheme();
    return (
        <HeroDitheringRoot className="relative mt-16 sm:mt-20 md:mt-24 border-t">
            <div className="p-1 mask-r-from-70% mask-l-from-70% mask-t-from-70% mask-b-from-20%">
                <HeroDitheringVisual
                    className="h-50 sm:h-75 w-full"
                    desktopShaderProps={{
                        width: 800,
                        height: 300,
                        colorBack: resolvedTheme === "dark" ? "#000000" : "#ffffff",
                        colorFront: resolvedTheme === "dark" ? "#ffffff" : "#000000",
                        shape: "warp",
                        type: "4x4",
                        size: 2,
                        speed: 1,
                        scale: 0.6,
                    }}
                />
            </div>
            <div className="z-10 absolute top-2/3 h-1/3 w-full flex flex-col items-center justify-center">
                <h3 className="text-2xl md:text-3xl font-bold">
                    <span>prabhatlabs</span>
                    <span className="text-muted-foreground">.dev</span>
                </h3>
                <p className="text-muted-foreground text-xs md:text-sm">prabhatlabs.dev &copy; 2026</p>
            </div>
        </HeroDitheringRoot>
    );
}
