import Link from "next/link";

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
            className="group block p-6 rounded-lg border border-border bg-card/50 hover:bg-card/80 transition-colors"
        >
            <div className="flex items-center gap-3 text-sm text-muted-foreground mb-2">
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
                        <span className="text-primary">{tags[0]}</span>
                    </>
                )}
            </div>
            <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {title}
            </h2>
            <p className="text-muted-foreground line-clamp-2">{description}</p>
            {tags.length > 1 && (
                <div className="flex gap-2 mt-4">
                    {tags.slice(1).map((tag) => (
                        <span
                            key={tag}
                            className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </Link>
    );
}