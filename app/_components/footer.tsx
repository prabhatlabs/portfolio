"use client";

import {
    HeroDitheringRoot,
    HeroDitheringVisual,
} from "@/components/ui/hero-dithering";
import { GeistPixelSquare } from "geist/font/pixel";
import { useTheme } from "next-themes";

export function Footer() {
    const { resolvedTheme } = useTheme();
    return (
        <HeroDitheringRoot className="relative mt-16 sm:mt-20 md:mt-24 border-t">
            <div className="mask-r-from-80% mask-l-from-80% mask-t-from-80% mask-b-from-0%">
                <HeroDitheringVisual
                    className="h-20 sm:h-40 w-full"
                    desktopShaderProps={{
                        width: "100%",
                        height: "100%",
                        colorBack:
                            resolvedTheme === "dark" ? "#000000" : "#ffffff",
                        colorFront:
                            resolvedTheme === "dark" ? "#ffffff" : "#000000",
                        shape: "warp",
                        type: "4x4",
                        size: 1.5,
                        speed: 2,
                        scale: 0.6,
                    }}
                />
                <div className="z-10 absolute bottom-6 h-fit w-full flex flex-col items-center justify-center">
                    <h3 className={`text-3xl md:text-5xl ${GeistPixelSquare.className}`}>
                        <span>prabhatlabs</span>
                        <span className="text-muted-foreground">.dev</span>
                    </h3>
                </div>
            </div>
        </HeroDitheringRoot>
    );
}
