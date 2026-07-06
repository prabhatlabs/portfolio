import { BlogCard } from "@/components/blog/BlogCard";
import JsonLd from "@/components/JsonLd";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { getAllPosts } from "@/lib/blogs";
import { buildBlogListJsonLd } from "@/lib/json-ld";
import { Metadata } from "next";
import Link from "next/link";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://prabhatlabs.dev";

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Thoughts, learnings, and things I found worth writing down — code, concepts, and the occasional rabbit hole. No newsletters, no SEO fluff. Just things I'm building, learning, and figuring out.",
    openGraph: {
        title: "Blog — Prabhat Mishra",
        description:
            "Thoughts, learnings, and things I found worth writing down — code, concepts, and the occasional rabbit hole.",
        url: `${BASE_URL}/blog`,
        type: "website",
        images: [{ url: `${BASE_URL}/preview.webp` }],
    },
};

export default async function BlogPage() {
    const posts = await getAllPosts();

    const jsonLd = buildBlogListJsonLd(posts, BASE_URL);

    return (
        <>
            <JsonLd jsonLd={jsonLd} />
            <div>
                <div className="max-w-3xl py-6 md:py-8 mx-auto flex justify-between items-center gap-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold">Blogs</h1>
                        <p className="text-muted-foreground">
                            Thoughts, learnings, and things I found worth writing
                            down.
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                    </div>
                </div>
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
                        {posts.map((post) => {
                            return (
                                <BlogCard
                                    key={post.slug}
                                    slug={post.slug}
                                    title={post.title}
                                    date={post.date}
                                    description={post.description}
                                    tags={post.tags}
                                    coverImage={post.coverImage}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
}
