"use client";

import { GeistPixelSquare } from "geist/font/pixel";

export function Footer() {
    return (
        <div className="mt-16 sm:mt-20 md:mt-24 border-t">
            <div className="relative h-20 sm:h-40 w-full mask-r-from-80% mask-l-from-80% mask-t-from-80% mask-b-to-95%">
                <div className="z-10 absolute bottom-4 h-fit w-full flex flex-col items-center justify-center">
                    <h3 className={`text-3xl md:text-5xl ${GeistPixelSquare.className}`}>
                        <span>prabhatlabs</span>
                        <span className="text-muted-foreground">.dev</span>
                    </h3>
                </div>
            </div>
        </div>
    );
}
