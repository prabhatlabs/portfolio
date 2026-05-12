import { Fragment, ReactNode } from "react";

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
        <article className="py-26 md:py-32">
            <header className="mb-8">
                <div className="flex items-center flex-wrap gap-x-2 text-sm text-muted-foreground mb-4">
                    <time dateTime={date}>
                        {new Date(date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </time>
                    {tags.length > 0 && (
                        <>
                            {tags.map((tag) => (
                                <Fragment key={tag}>
                                    <span>•</span>
                                    <span key={tag} className="text-primary">
                                        {tag}
                                    </span>
                                </Fragment>
                            ))}
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
