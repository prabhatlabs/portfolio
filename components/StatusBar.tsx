"use client";

import { formatDateTime } from "@/lib/time";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { IncrementAndFetchResult, VisitorCounter } from "./VisitorCounter";

function DateTime({ className }: { className?: string }) {
    // const [time, setTime] = useState<string>("--/--/----, --:--:-- --");
    const [time, setTime] = useState<string>(
        formatDateTime(new Date().getTime()),
    );

    useEffect(() => {
        const interval = setInterval(() => {
            const t = new Date().getTime();
            const dtStr = formatDateTime(t);
            setTime(dtStr);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <span
            suppressHydrationWarning={true}
            className={cn(className, "w-34 text-center")}
        >
            {time}
        </span>
    );
}

export function StatusBar({ className }: { className?: string }) {
    const [ipGeoData, setIpGeoData] = useState<null | Exclude<
        IncrementAndFetchResult,
        "count"
    >>(null);

    useEffect(() => {
        const ipGeoStr = localStorage?.getItem("visitor_ip_geo");
        if (ipGeoStr) {
            const ipGeo = JSON.parse(ipGeoStr);
            setIpGeoData(ipGeo as Exclude<IncrementAndFetchResult, "count">);
        }
    }, []);

    return (
        <div className={cn(className, "flex items-center border-b")}>
            {ipGeoData?.ip && (
                <span className="px-1 border-l">{ipGeoData.ip}</span>
            )}
            {ipGeoData?.country && (
                <span className="px-1 border-l">{ipGeoData.country}</span>
            )}
            {ipGeoData?.os && (
                <span className="px-1 border-l">{ipGeoData?.os}</span>
            )}
            <DateTime className="px-1 border-l" />
            <VisitorCounter className="px-1 border-l" />
        </div>
    );
}
