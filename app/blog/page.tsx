import { BlogCard } from "@/components/blog/BlogCard";
import { Button } from "@/components/ui/button";
import { getAllPosts } from "@/lib/github";
import { Metadata } from "next";
import Link from "next/link";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "Blog",
    description: "Articles about development, programming, and tech.",
};

export default async function BlogPage() {
    const posts = await getAllPosts();

    return (
        <div>
            {posts.length === 0 ? (
                <div className="text-center space-y-6 py-20">
                    <div className="relative">
                        <h1
                            className="text-[12rem] sm:text-[16rem] font-bold leading-none tracking-tighter font-mono select-none"
                            style={{
                                background:
                                    "repeating-linear-gradient(315deg, color-mix(in oklab, var(--border) 60%, transparent) 0, color-mix(in oklab, var(--border) 60%, transparent) 2px, transparent 0, transparent 50%)",
                                backgroundSize: "10px 10px",
                                WebkitBackgroundClip: "text",
                                backgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                color: "transparent",
                                animation: "line-shadow 10s linear infinite",
                            }}
                        >
                            ahhh!!
                        </h1>

                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-6xl sm:text-8xl font-bold">
                                ahhh!!
                            </span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h2 className="text-lg sm:text-xl font-semibold">
                            No blogs or something went wrong.
                        </h2>
                        <p className="text-muted-foreground max-w-md mx-auto text-sm sm:text-lg">
                            <span className="inline-block animate-wiggle">
                                ¯\_(ツ)_/¯
                            </span>
                        </p>
                    </div>

                    <Button asChild className="mt-8" size="lg">
                        <Link href="/">User go back!!!</Link>
                    </Button>
                </div>
            ) : (
                <div className="grid gap-6">
                    {posts.map((post) => (
                        <BlogCard
                            key={post.slug}
                            slug={post.slug}
                            title={post.title}
                            date={post.date}
                            description={post.description}
                            tags={post.tags}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
