"use client";

import { renderNumber } from "@/lib/render-numbers";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { TbLoader2 } from "react-icons/tb";

export type IncrementAndFetchResult = {
    count: number;
    ip: string;
    os: string;
    country: string;
    ping: number | null;
};

export type IpGeo = Exclude<IncrementAndFetchResult, "count">

interface VisitorCounterProps {
    slug?: string;
    className?: string;
    onIpGeoData?: (data: IpGeo) => void;
}


async function incrementAndFetch(slug?: string): Promise<IncrementAndFetchResult> {
    try {
        const endpoint = slug ? `/api/visitor?slug=${slug}` : "/api/visitor";
        const t0 = performance.now();
        const response = await fetch(endpoint, { method: "POST" });
        const ping = Math.round(performance.now() - t0);
        const data = await response.json();
        return {
            count: data.count || 0,
            ip: data.ip || "",
            os: data.os || "",
            country: data.country || "",
            ping,
        };
    } catch (error) {
        console.error("Failed to update visitor count:", error);
        return {
            count: 0,
            ip: "",
            os: "",
            country: "",
            ping: null,
        };
    }
}

export function VisitorCounter({ slug, className, onIpGeoData }: VisitorCounterProps) {
    const [count, setCount] = useState<string | null>(null);
    const isMounted = useRef(false);

    useEffect(() => {
        if (isMounted.current) return;
        isMounted.current = true;

        const lastVisitKey = slug
            ? `visitor_last_visit_${slug}`
            : "visitor_last_visit_home";
        const countKey = slug ? `visitor_count_${slug}` : "visitor_count_home";
        const ipGeoKey = "visitor_ip_geo";
        const lastVisit = localStorage.getItem(lastVisitKey);
        const cachedCount = localStorage.getItem(countKey);
        const now = Date.now();

        const handleOps = async () => {
            if (cachedCount) setCount(renderNumber(parseInt(cachedCount)));

            if (!lastVisit || now - parseInt(lastVisit) > 120_000) {
                const res = await incrementAndFetch(slug);
                setCount(renderNumber(res.count));
                localStorage.setItem(lastVisitKey, now.toString());
                localStorage.setItem(countKey, res.count.toString());

                const ipgeodata = {
                    ip: res.ip,
                    os: res.os,
                    country: res.country,
                    ping: res.ping,
                } as IpGeo;
                onIpGeoData?.(ipgeodata);
                localStorage.setItem(ipGeoKey, JSON.stringify(ipgeodata));
            }
        };

        handleOps();
    }, [slug]);

    return (
        <span className={cn("flex items-center justify-center gap-1", className)}>
            {!count && <TbLoader2 className="size-2.5 animate-spin" />}
            {count !== null && count} visitors
        </span>
    );
}
