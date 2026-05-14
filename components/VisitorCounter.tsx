"use client";

import { useEffect, useState } from "react";

interface VisitorCounterProps {
  slug?: string;
  className?: string;
}

export function VisitorCounter({ slug, className }: VisitorCounterProps) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const endpoint = slug ? `/api/visitor/${slug}` : "/api/visitor";
    const storageKey = slug ? `visitor_last_visit_${slug}` : "visitor_last_visit_home";
    const lastVisit = localStorage.getItem(storageKey);
    const now = Date.now();

    const fetchOnly = async () => {
      try {
        const response = await fetch(endpoint, { method: "GET" });
        const data = await response.json();
        setCount(data.count);
      } catch (error) {
        console.error("Failed to fetch visitor count:", error);
      }
    };

    const incrementAndFetch = async () => {
      try {
        const response = await fetch(endpoint, { method: "POST" });
        const data = await response.json();
        setCount(data.count);
        localStorage.setItem(storageKey, now.toString());
      } catch (error) {
        console.error("Failed to update visitor count:", error);
      }
    };

    if (!lastVisit || now - parseInt(lastVisit) > 60000) {
      incrementAndFetch();
    } else {
      fetchOnly();
    }
  }, [slug]);

  if (count === null) {
    return <span className={className}>-</span>;
  }

  return <span className={className}>{count} visitors</span>;
}

