"use client";

import { Button } from "@/components/ui/button";
import { copyToClipboard } from "@/lib/clipboard";
import envvars from "@/lib/envvars";
import { GeistPixelSquare } from "geist/font/pixel";
import { useEffect, useState } from "react";
import { IoCheckmark, IoCopyOutline } from "react-icons/io5";
import { VscLinkExternal } from "react-icons/vsc";

export default function Cli() {
    const [isCopied, setIsCopied] = useState(false);
    const text = `curl ${envvars.BASE_URL}/cli.sh | bash`;
    const scriptUrl = `${envvars.BASE_URL}/cli.sh`;

    async function handleCopyBtnClick() {
        await copyToClipboard(text);
        setIsCopied(true);
    }

    function handleOpenScript() {
        window.open(scriptUrl, "_blank");
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
                onClick={handleOpenScript}
                className={`px-2 py-1 h-9 flex items-center border-x text-muted-foreground bg-muted/10 text-sm sm:text-base font-mono ${GeistPixelSquare.className}`}
            >
                {text}
            </p>
            <div className="flex items-center gap-2">
                <Button
                    onClick={handleCopyBtnClick}
                    disabled={isCopied}
                    size={"icon"}
                    variant={"ghost"}
                    className="border-x text-muted-foreground [&_svg:not([class*='size-'])]:size-3.5"
                >
                    {isCopied ? (
                        <IoCheckmark className="text-green-500" />
                    ) : (
                        <IoCopyOutline />
                    )}
                </Button>
                <Button
                    onClick={handleOpenScript}
                    size={"icon"}
                    variant={"ghost"}
                    className="border-x text-muted-foreground [&_svg:not([class*='size-'])]:size-3.5 hidden sm:flex"
                >
                    <VscLinkExternal />
                </Button>
            </div>
        </div>
    );
}
