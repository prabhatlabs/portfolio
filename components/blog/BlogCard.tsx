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
    const cloudinaryBaseUrl = process.env.NEXT_PUBLIC_CLOUDINARY_BASE_URL;
    const coverImageUrl =
        coverImage && !coverImage.startsWith("http") && cloudinaryBaseUrl
            ? `${cloudinaryBaseUrl}${coverImage}`
            : coverImage;
    return (
        <Link
            href={`/blog/${slug}`}
            className="group grid grid-cols-1 md:grid-cols-[7.5rem_1fr] gap-4 p-4 rounded-xl border border-border bg-card hover:bg-muted hover:shadow-lg transition-all duration-500 overflow-hidden"
        >
            {coverImageUrl ? (
                <div className="relative w-full h-30 aspect-video md:aspect-square overflow-hidden rounded-lg border border-border/50">
                    <Image
                        src={coverImageUrl}
                        alt={title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
            ) : (
                <div className="hidden md:flex aspect-square rounded-lg bg-muted items-center justify-center border border-dashed border-border">
                    <span className="text-4xl">📄</span>
                </div>
            )}
            <div className="flex flex-col justify-center space-y-2">
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
                <h2 className="group-hover:underline text-xl font-bold group-hover:text-primary transition-colors leading-tight">
                    {title}
                </h2>
                <p className="text-muted-foreground line-clamp-2 text-sm leading-relaxed">
                    {description}
                </p>
            </div>
        </Link>
    );
}
