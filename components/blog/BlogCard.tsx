import Link from "next/link";
import { Fragment } from "react";

interface BlogCardProps {
    slug: string;
    title: string;
    date: string;
    description: string;
    tags: string[];
}

export function BlogCard({
    slug,
    title,
    date,
    description,
    tags,
}: BlogCardProps) {
    return (
        <Link
            href={`/blog/${slug}`}
            className="group block px-4 py-3 rounded-lg border border-border bg-card hover:bg-muted hover:shadow-lg transition-all duration-500"
        >
            <div className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                <time dateTime={date}>
                    {new Date(date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </time>
                {tags.map((t) => (
                    <Fragment key={t}>
                        <span>•</span>
                        <span className="text-foreground">{t}</span>
                    </Fragment>
                ))}
            </div>
            <h2 className="group-hover:underline text-lg font-semibold group-hover:text-primary transition-colors">
                {title}
            </h2>
            <p className="text-muted-foreground line-clamp-2 text-sm">
                {description}
            </p>
        </Link>
    );
}
