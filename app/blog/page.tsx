import BorderLayoutForStaticPages from "@/components/BorderLayoutForStaticPages";
import JsonLd from "@/components/JsonLd";
import { getAllPosts } from "@/lib/blogs";
import envvars from "@/lib/envvars";
import { buildBlogListJsonLd, buildBreadcrumbListJsonLd } from "@/lib/json-ld";
import { GeistPixelSquare } from "geist/font/pixel";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Thoughts, learnings, and things I found worth writing down — code, concepts, and the occasional rabbit hole.",
    openGraph: {
        title: "Blog — Prabhat Mishra",
        description:
            "Thoughts, learnings, and things I found worth writing down — code, concepts, and the occasional rabbit hole.",
        url: `${envvars.BASE_URL}/blog`,
        type: "website",
        images: [{ url: `${envvars.BASE_URL}/preview.webp` }],
    },
};

const breadcrumbLd = buildBreadcrumbListJsonLd([
    { name: "Home", url: envvars.BASE_URL },
    { name: "Blog", url: `${envvars.BASE_URL}/blog` },
]);

export default async function BlogPage() {
    const posts = await getAllPosts();

    const jsonLd = buildBlogListJsonLd(posts, envvars.BASE_URL);
    const lastUpdated = posts.length > 0 ? posts[0].date : "";

    return (
        <>
            <JsonLd jsonLd={jsonLd} />
            <JsonLd jsonLd={breadcrumbLd} />
            <BorderLayoutForStaticPages
                title="Blog"
                desc="Thoughts, learnings, and things I found worth writing down."
                lastUpdated={lastUpdated}
            >
                <div className="relative">
                    <span className="text-muted-foreground/50 text-[10px] font-mono absolute top-0 left-4 mb-1">
                        p-4 flex gap-4 items-start
                    </span>
                    {posts.length === 0 ? (
                        <div className="text-center space-y-6 py-20 px-4">
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
                        </div>
                    ) : (
                        <div className="pt-4">
                            {posts.map((post) => (
                                <Link
                                    href={`/blog/${post.slug}`}
                                    key={post.slug}
                                    className="border-t p-4 flex flex-col sm:flex-row gap-4 items-start"
                                >
                                    <article className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h2
                                                className={`text-lg sm:text-xl ${GeistPixelSquare.className}`}
                                            >
                                                {post.title}
                                            </h2>
                                        </div>
                                        <div className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground mb-1">
                                            <time dateTime={post.date}>
                                                {new Date(
                                                    post.date,
                                                ).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </time>
                                            {post.readingTime && (
                                                <>
                                                    <span>·</span>
                                                    <span>
                                                        {post.readingTime}
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                        <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
                                            {post.description}
                                        </p>
                                        {post.tags && post.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1">
                                                {post.tags.map((t) => (
                                                    <span
                                                        key={t}
                                                        className="text-xs bg-foreground/10 px-2 py-0.5 border"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </article>
                                    {post.coverImage && (
                                        <Image
                                            src={post.coverImage}
                                            alt={post.title}
                                            width={180}
                                            height={96}
                                            className="w-full sm:w-50 aspect-video border shrink-0 object-cover"
                                        />
                                    )}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </BorderLayoutForStaticPages>
        </>
    );
}
