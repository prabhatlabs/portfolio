"use client";

import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/clipboard";
import { GeistPixelSquare } from "geist/font/pixel";
import { useEffect, useState } from "react";
import { IoCopyOutline, IoCheckmark } from "react-icons/io5";

export default function Cli() {
    const [isCopied, setIsCopied] = useState(false);
    const text = "curl https://prabhatlabs.dev/cli | bash";

    async function handleCopyBtnClick() {
        await copyToClipboard(text);
        setIsCopied(true);
    }

    useEffect(() => {
        if (!isCopied) return;

        const timeout = setTimeout(() => {
            setIsCopied(false);
        }, 3000);

        return () => {
            clearTimeout(timeout);
        };
    }, [isCopied]);

    return (
        <div className="w-full flex justify-between items-center gap-4">
            <p
                className={`px-2 py-1 h-9 flex items-center border-x text-muted-foreground bg-muted/10 font-mono ${GeistPixelSquare.className}`}
            >
                {text}
            </p>
            <Button
                onClick={handleCopyBtnClick}
                disabled={isCopied}
                size={"icon"}
                variant={"ghost"}
                className="border-x"
            >
                {isCopied ? <IoCheckmark className="text-green-500" /> : <IoCopyOutline />}
            </Button>
        </div>
    );
}
