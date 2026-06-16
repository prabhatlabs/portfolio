"use client";

import { useTheme } from "next-themes";
import { HeroDitheringRoot, HeroDitheringVisual } from "./ui/hero-dithering";

export default function AboveAboutBanner() {
    const { resolvedTheme } = useTheme();

    return (
        <HeroDitheringRoot className="absolute top-0 flex items-center w-full">
            <div className="w-full mask-r-from-70% mask-l-from-70% mask-t-from-70% mask-b-to-70%">
                <HeroDitheringVisual
                    className="h-144 sm:h-117 md:h-110 w-full"
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
            </div>
        </HeroDitheringRoot>
    );
}
