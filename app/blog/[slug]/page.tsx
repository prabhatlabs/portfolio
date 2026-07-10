import { BlogPost } from "@/components/blog/BlogPost";
import { MDXComponents } from "@/components/blog/MDXComponents";
import { SimilarPosts } from "@/components/blog/SimilarPosts";
import BorderLayoutForStaticPages from "@/components/BorderLayoutForStaticPages";
import JsonLd from "@/components/JsonLd";
import { VisitorCounter } from "@/components/VisitorCounter";
import { getAllPosts, getPostBySlug, getPostMetaBySlug } from "@/lib/blogs";
import envvars from "@/lib/envvars";
import { getFullImageUrl } from "@/lib/image-helper";
import { buildBlogPostJsonLd, buildBreadcrumbListJsonLd } from "@/lib/json-ld";
import { formatDateMMMMDDYYYY } from "@/lib/time";
import rehypeShiki from "@shikijs/rehype";
import { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fragment } from "react/jsx-runtime";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = await getAllPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        return {
            title: "Post Not Found",
        };
    }

    const coverImageUrl = getFullImageUrl(post.coverImage);

    return {
        title: post.title,
        description: post.description,
        keywords: post.tags,
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            publishedTime: post.date,
            tags: post.tags,
            images: coverImageUrl ? [{ url: coverImageUrl }] : [],
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.description,
            images: coverImageUrl ? [coverImageUrl] : [],
        },
        alternates: {
            canonical: `${envvars.BASE_URL}/blog/${slug}`,
        },
        authors: [{ name: "Prabhat Mishra", url: envvars.BASE_URL }],
        category: post.tags?.[0] || "Technology",
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = post.related
        ? (
              await Promise.all(
                  post.related.map((slug) => getPostMetaBySlug(slug)),
              )
          ).filter((p): p is NonNullable<typeof p> => p !== null)
        : [];

    const jsonLd = buildBlogPostJsonLd(post, envvars.BASE_URL);
    const breadcrumbLd = buildBreadcrumbListJsonLd([
        { name: "Home", url: envvars.BASE_URL },
        { name: "Blog", url: `${envvars.BASE_URL}/blog` },
        { name: post.title, url: `${envvars.BASE_URL}/blog/${slug}` },
    ]);

    const { content } = await compileMDX({
        source: post.content,
        components: MDXComponents,
        options: {
            mdxOptions: {
                rehypePlugins: [
                    [
                        rehypeShiki,
                        {
                            themes: {
                                light: "github-light",
                                dark: "github-dark",
                            },
                        },
                    ],
                ],
            },
        },
    });

    return (
        <BorderLayoutForStaticPages
            title={post.title}
            desc={post.description}
            lastUpdated={post.date}
            additionalHeaderComponent={
                <>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Link href={"/"} className="underline">
                            prabhatlabs.dev
                        </Link>
                        <span>•</span>
                        <Link href={"/blog"} className="underline">
                            All Blogs
                        </Link>
                        <span>•</span>
                        <VisitorCounter slug={slug} />
                    </div>
                    <header className="">
                        <div className="flex items-center flex-wrap gap-x-2 text-sm text-muted-foreground mb-4">
                            <time
                                dateTime={post.date}
                                itemProp="datePublished"
                                content={post.date}
                            >
                                {formatDateMMMMDDYYYY(post.date)}
                            </time>
                            {post.readingTime && (
                                <>
                                    <span>•</span>
                                    <span itemProp="timeRequired">
                                        {post.readingTime}
                                    </span>
                                </>
                            )}
                            {post.tags.length > 0 && <span>•</span>}
                            {post.tags.length > 0 && (
                                <>
                                    {post.tags.map((tag, index) => (
                                        <Fragment key={tag}>
                                            <span
                                                key={tag}
                                                className="italic"
                                                itemProp="articleSection"
                                            >
                                                {tag}
                                            </span>
                                            {index !== post.tags.length - 1 && (
                                                <span>•</span>
                                            )}
                                        </Fragment>
                                    ))}
                                </>
                            )}
                        </div>
                        {post.coverImage && (
                            <div className="relative w-full mt-2 bg-muted/50 border">
                                <Image
                                    src={post.coverImage}
                                    alt={post.title}
                                    width={720}
                                    height={400}
                                    className="object-contain w-full"
                                    loading="eager"
                                    fetchPriority="high"
                                    itemProp="image"
                                />
                            </div>
                        )}
                    </header>
                </>
            }
        >
            <div className="space-y-6 md:space-y-8">
                <JsonLd jsonLd={jsonLd} />
                <JsonLd jsonLd={breadcrumbLd} />
                <BlogPost>{content}</BlogPost>

                {relatedPosts.length > 0 && (
                    <SimilarPosts posts={relatedPosts} />
                )}
            </div>
        </BorderLayoutForStaticPages>
    );
}
