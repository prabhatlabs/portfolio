"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function TableOfContents() {
    const [headings, setHeadings] = useState<{ id: string; text: string }[]>(
        [],
    );
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const h2Elements = Array.from(document.querySelectorAll("article h2"));
        const extractedHeadings = h2Elements.map((el) => ({
            id: el.id,
            text: el.textContent?.replace("#", "").trim() || "",
        }));
        setHeadings(extractedHeadings);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "-100px 0% -80% 0%" },
        );

        h2Elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    if (headings.length === 0) return null;

    return (
        <aside className="hidden lg:block absolute left-[calc(100%+1.5rem)] top-0 w-48 h-full">
            <div className="sticky top-24">
                <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">
                    On this page
                </h3>
                <nav>
                    <ul className="space-y-2 text-sm">
                        {headings.map((heading) => (
                            <li key={heading.id}>
                                <a
                                    href={`#${heading.id}`}
                                    className={cn(
                                        "block transition-colors hover:text-primary line-clamp-2",
                                        activeId === heading.id
                                            ? "text-primary font-medium"
                                            : "text-muted-foreground",
                                    )}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document
                                            .getElementById(heading.id)
                                            ?.scrollIntoView({
                                                behavior: "smooth",
                                            });
                                        window.history.pushState(
                                            null,
                                            "",
                                            `#${heading.id}`,
                                        );
                                    }}
                                >
                                    {heading.text}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
