import { getFullImageUrl } from "@/lib/image-helper";
import Image from "next/image";
import { Fragment, ReactNode } from "react";

interface BlogPostProps {
    slug: string;
    title: string;
    date: string;
    description: string;
    tags: string[];
    children: ReactNode;
    coverImage?: string;
}

export function BlogPost({
    slug,
    title,
    date,
    description,
    tags,
    children,
    coverImage,
}: BlogPostProps) {
    const coverImageUrl = getFullImageUrl(coverImage);
    return (
        <article>
            <header className="mb-6">
                <div className="flex items-center flex-wrap gap-x-2 text-sm text-muted-foreground mb-4">
                    <time dateTime={date}>
                        {new Date(date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </time>
                    {tags.length > 0 && <span>•</span>}
                    {tags.length > 0 && (
                        <>
                            {tags.map((tag, index) => (
                                <Fragment key={tag}>
                                    <span key={tag} className="text-primary">
                                        {tag}
                                    </span>
                                    {index !== tags.length - 1 && (
                                        <span>•</span>
                                    )}
                                </Fragment>
                            ))}
                        </>
                    )}
                </div>
                <h1 className="text-4xl font-bold mb-4">{title}</h1>
                <p className="text-xl text-muted-foreground mb-6">
                    {description}
                </p>
                {coverImageUrl && (
                    <div className="relative w-full aspect-video mb-8 overflow-hidden rounded-xl border border-border">
                        <Image
                            src={coverImageUrl}
                            alt={title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                )}
            </header>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
                {children}
            </div>
        </article>
    );
}
