"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { TbLoader2 } from "react-icons/tb";

interface VisitorCounterProps {
    slug?: string;
    className?: string;
}

export function VisitorCounter({ slug, className }: VisitorCounterProps) {
    const [count, setCount] = useState<number | null>(null);
    const [loading, setloading] = useState<boolean>(false);
    const isMounted = useRef(false);

    useEffect(() => {
        if (isMounted.current) return;
        isMounted.current = true;

        const endpoint = slug ? `/api/visitor?slug=${slug}` : "/api/visitor";
        const storageKey = slug
            ? `visitor_last_visit_${slug}`
            : "visitor_last_visit_home";
        const countKey = slug
            ? `visitor_count_${slug}`
            : "visitor_count_home";
        
        const lastVisit = localStorage.getItem(storageKey);
        const cachedCount = localStorage.getItem(countKey);
        const now = Date.now();

        const incrementAndFetch = async () => {
            try {
                const response = await fetch(endpoint, { method: "POST" });
                const data = await response.json();
                setCount(data.count);
                localStorage.setItem(storageKey, now.toString());
                localStorage.setItem(countKey, data.count.toString());
            } catch (error) {
                console.error("Failed to update visitor count:", error);
            }
        };

        const handleOps = async () => {
            setloading(true);
            if (!lastVisit || !cachedCount || now - parseInt(lastVisit) > 120000) {
                await incrementAndFetch();
            } else {
                setCount(parseInt(cachedCount));
            }
            setloading(false);
        };

        handleOps();
    }, [slug]);

    return (
        <span className={cn("flex items-center gap-1", className)}>
            {loading && <TbLoader2 className="size-2.5 animate-spin" />}
            {count !== null && count} visitors
        </span>
    );
}
