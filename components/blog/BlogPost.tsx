import { ReactNode } from "react";
import { TableOfContents } from "./TableOfContents";

interface BlogPostProps {
    children: ReactNode;
}

export function BlogPost({ children }: BlogPostProps) {
    return (
        <article
            className="relative p-4 md:p-6"
            role="article"
            aria-labelledby="blog-title"
        >
            <TableOfContents />
            <div
                className="prose prose-neutral dark:proinvert max-w-none"
                itemProp="articleBody"
            >
                {children}
            </div>
        </article>
    );
}
