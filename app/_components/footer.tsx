"use client";

import { GeistPixelSquare } from "geist/font/pixel";

export function Footer() {
    return (
        <div className="mt-16 sm:mt-20 md:mt-24 border-t">
            <div className="py-6 sm:py-8 md:py-12 w-full flex items-center justify-center mask-r-from-80% mask-l-from-80% mask-t-from-80% mask-b-to-75%">
                <h3
                    className={`text-4xl sm:text-5xl md:text-7xl ${GeistPixelSquare.className}`}
                >
                    <span>prabhatlabs</span>
                    <span className="text-muted-foreground">.dev</span>
                </h3>
            </div>
        </div>
    );
}
