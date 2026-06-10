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
    const isMounted = useRef(false);

    useEffect(() => {
        if (isMounted.current) return;
        isMounted.current = true;

        const incrementAndFetch = async (): Promise<number> => {
            try {
                const endpoint = slug
                    ? `/api/visitor?slug=${slug}`
                    : "/api/visitor";
                const response = await fetch(endpoint, { method: "POST" });
                const data = await response.json();
                return data.count || 0;
            } catch (error) {
                console.error("Failed to update visitor count:", error);
                return 0;
            }
        };

        const lastVisitKey = slug
            ? `visitor_last_visit_${slug}`
            : "visitor_last_visit_home";
        const countKey = slug ? `visitor_count_${slug}` : "visitor_count_home";
        const lastVisit = localStorage.getItem(lastVisitKey);
        const cachedCount = localStorage.getItem(countKey);
        const now = Date.now();

        const handleOps = async () => {
            if (cachedCount) setCount(parseInt(cachedCount));

            if (!lastVisit || now - parseInt(lastVisit) > 120_000) {
                const c = await incrementAndFetch();
                setCount(c);
                localStorage.setItem(lastVisitKey, now.toString());
                localStorage.setItem(countKey, c.toString());
            }
        };

        handleOps();
    }, [slug]);

    return (
        <span className={cn("flex items-center gap-1", className)}>
            {!count && <TbLoader2 className="size-2.5 animate-spin" />}
            {count !== null && count} visitors
        </span>
    );
}
