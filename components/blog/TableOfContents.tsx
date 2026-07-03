"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type Heading = { id: string; text: string; level: number };

export function TableOfContents() {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const elements = Array.from(
            document.querySelectorAll("article h2, article h3"),
        );

        const extracted = elements.map((el) => ({
            id: el.id,
            text: el.textContent?.replace(/#$/, "").trim() || "",
            level: parseInt(el.tagName[1], 10),
        }));
        setHeadings(extracted);

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

        elements.forEach((el) => el.id && observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
            window.history.pushState(null, "", `#${id}`);
        }
    };

    if (headings.length === 0) return null;

    return (
        <aside className="hidden lg:block absolute left-[calc(100%+1.5rem)] top-0 w-48 h-full">
            <div className="sticky top-24">
                <h3 className="text-sm font-semibold mb-3 uppercase tracking-wider text-muted-foreground">
                    On this page
                </h3>
                <nav>
                    <ul className="space-y-1 text-sm">
                        {headings.map((heading) =>
                            heading.id ? (
                                <li key={heading.id}>
                                    <a
                                        href={`#${heading.id}`}
                                        className={cn(
                                            "block transition-colors hover:text-primary line-clamp-2",
                                            heading.level === 3 && "pl-4",
                                            activeId === heading.id
                                                ? "text-primary font-medium"
                                                : "text-muted-foreground",
                                        )}
                                        onClick={(e) =>
                                            handleClick(e, heading.id)
                                        }
                                    >
                                        {heading.text}
                                    </a>
                                </li>
                            ) : null,
                        )}
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
