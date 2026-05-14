import { getFullImageUrl } from "@/lib/image-helper";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

interface BlogCardProps {
    slug: string;
    title: string;
    date: string;
    description: string;
    tags: string[];
    coverImage?: string;
}

export function BlogCard({
    slug,
    title,
    date,
    description,
    tags,
    coverImage,
}: BlogCardProps) {
    const coverImageUrl = getFullImageUrl(coverImage);
    return (
        <Link
            href={`/blog/${slug}`}
            className="group grid grid-cols-1 md:grid-cols-[8rem_1fr] md:gap-4 rounded-lg border border-border bg-muted/50 hover:bg-muted hover:shadow-lg transition-all duration-500 overflow-hidden"
        >
            <div className="relative w-full h-full aspect-video md:aspect-square overflow-hidden border-b md:border-b-0 md:border-r">
                {coverImageUrl ? (
                    <Image
                        src={coverImageUrl}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="bg-muted w-full h-full"></div>
                )}
            </div>
            <div className="flex flex-col justify-center p-4">
                <div className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground mb-1">
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
                <h2 className="group-hover:underline text-xl font-bold group-hover:text-primary transition-colors leading-tight mb-2">
                    {title}
                </h2>
                <p className="text-muted-foreground line-clamp-3 text-sm leading-tight">
                    {description}
                </p>
            </div>
        </Link>
    );
}
