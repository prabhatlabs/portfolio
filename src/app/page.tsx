"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MyPage() {
    const router = useRouter();
    useEffect(() => {
        router.push("/overview")
    }, []);
    return (
        <div className="w-dvw h-dvh p-4 flex items-center justify-center font-mono animate-pulse">
            prabhatlabs.dev
        </div>
    )
}