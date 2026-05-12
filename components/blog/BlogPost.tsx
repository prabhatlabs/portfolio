import { ReactNode } from "react";

interface BlogPostProps {
    title: string;
    date: string;
    description: string;
    tags: string[];
    children: ReactNode;
}

export function BlogPost({
    title,
    date,
    description,
    tags,
    children,
}: BlogPostProps) {
    return (
        <article className="max-w-3xl mx-auto">
            <header className="mb-8">
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                    <time dateTime={date}>
                        {new Date(date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </time>
                    {tags.length > 0 && (
                        <>
                            <span>•</span>
                            <div className="flex gap-2">
                                {tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="text-primary"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </>
                    )}
                </div>
                <h1 className="text-4xl font-bold mb-4">{title}</h1>
                <p className="text-xl text-muted-foreground">{description}</p>
            </header>
            <div className="prose prose-neutral dark:prose-invert max-w-none">
                {children}
            </div>
        </article>
    );
}