import { getFullImageUrl } from "@/lib/image-helper";
import Image from "next/image";
import { Fragment, ReactNode } from "react";
import { TableOfContents } from "./TableOfContents";

interface BlogPostProps {
    slug: string;
    title: string;
    date: string;
    description: string;
    tags: string[];
    children: ReactNode;
    coverImage?: string;
    readingTime?: string;
}

export function BlogPost({
    slug,
    title,
    date,
    description,
    tags,
    children,
    coverImage,
    readingTime,
}: BlogPostProps) {
    const coverImageUrl = getFullImageUrl(coverImage);
    return (
        <article
            className="relative"
            role="article"
            aria-labelledby="blog-title"
        >
            <TableOfContents />
            <header className="mb-6">
                <div className="flex items-center flex-wrap gap-x-2 text-sm text-muted-foreground mb-4">
                    <time
                        dateTime={date}
                        itemProp="datePublished"
                        content={date}
                    >
                        {new Date(date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </time>
                    {readingTime && (
                        <>
                            <span>•</span>
                            <span itemProp="timeRequired">{readingTime}</span>
                        </>
                    )}
                    {tags.length > 0 && <span>•</span>}
                    {tags.length > 0 && (
                        <>
                            {tags.map((tag, index) => (
                                <Fragment key={tag}>
                                    <span
                                        key={tag}
                                        className="text-primary"
                                        itemProp="articleSection"
                                    >
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
                <h1
                    id="blog-title"
                    className="text-4xl font-bold mb-4"
                    itemProp="headline"
                >
                    {title}
                </h1>
                <p
                    className="text-xl text-muted-foreground mb-6"
                    itemProp="description"
                >
                    {description}
                </p>
                {coverImageUrl && (
                    <div className="relative w-full my-2 bg-muted/50 border rounded-lg">
                        <Image
                            src={coverImageUrl}
                            alt={title}
                            width={720}
                            height={400}
                            className="object-contain rounded-lg w-full"
                            loading="eager"
                            fetchPriority="high"
                            itemProp="image"
                        />
                    </div>
                )}
            </header>
            <div
                className="prose prose-neutral dark:proinvert max-w-none"
                itemProp="articleBody"
            >
                {children}
            </div>
        </article>
    );
}
