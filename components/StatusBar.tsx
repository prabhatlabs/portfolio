"use client";

import { formatDateTime } from "@/lib/time";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { IncrementAndFetchResult, IpGeo, VisitorCounter } from "./VisitorCounter";

function DateTime({ className }: { className?: string }) {
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
            className={cn(className, "w-36 text-center")}
        >
            {time}
        </span>
    );
}

export function StatusBar({ className }: { className?: string }) {
    // const [ipGeoData] = useState<null | Exclude<
    //     IncrementAndFetchResult,
    //     "count"
    // >>(() => {
    //     if (typeof window === "undefined") return null;
    //     const ipGeoStr = localStorage.getItem("visitor_ip_geo");
    //     return ipGeoStr ? JSON.parse(ipGeoStr) : null;
    // });

    const [ipGeoData, setIpGeoData] = useState<null | IpGeo>(() => {
        if (typeof window === "undefined") return null;
        const ipGeoStr = localStorage.getItem("visitor_ip_geo");
        return ipGeoStr ? JSON.parse(ipGeoStr) : null;
    });

    return (
        <div
            className={cn(className, "flex justify-end flex-wrap items-center")}
        >
            {ipGeoData?.ip && (
                <span className="px-1 border-l border-b">{ipGeoData.ip}</span>
            )}
            {ipGeoData?.ping && (
                <span className="px-1 border-l border-b">
                    {ipGeoData.ping}ms
                </span>
            )}
            {ipGeoData?.country && (
                <span className="px-1 border-l border-b">
                    {ipGeoData.country}
                </span>
            )}
            {ipGeoData?.os && (
                <span className="px-1 border-l border-b">{ipGeoData?.os}</span>
            )}
            <DateTime className="px-1 border-l border-b" />
            <VisitorCounter onIpGeoData={setIpGeoData} className="w-20 px-1 border-l border-b" />
        </div>
    );
}
