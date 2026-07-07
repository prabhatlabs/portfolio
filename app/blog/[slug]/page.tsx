import { BlogPost } from "@/components/blog/BlogPost";
import { MDXComponents } from "@/components/blog/MDXComponents";
import { SimilarPosts } from "@/components/blog/SimilarPosts";
import JsonLd from "@/components/JsonLd";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { VisitorCounter } from "@/components/VisitorCounter";
import { getAllPosts, getPostBySlug, getPostMetaBySlug } from "@/lib/blogs";
import { getFullImageUrl } from "@/lib/image-helper";
import { buildBlogPostJsonLd, buildBreadcrumbListJsonLd } from "@/lib/json-ld";
import envvars from "@/lib/envvars";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";

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

    return (
        <div className="space-y-6 md:space-y-8">
            <div className="mt-6 md:mt-8 mx-auto flex justify-between items-center gap-6">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Link href={"/"} className="hover:underline">
                        prabhatlabs.dev
                    </Link>
                    <span>•</span>
                    <Link href={"/blog"} className="hover:underline">
                        All Blogs
                    </Link>
                    <span>•</span>
                    <VisitorCounter slug={slug} />
                </div>
                <div className="flex items-center gap-4">
                    <ThemeToggle />
                </div>
            </div>

            <JsonLd jsonLd={jsonLd} />
            <JsonLd jsonLd={breadcrumbLd} />
            <BlogPost
                slug={post.slug}
                title={post.title}
                date={post.date}
                description={post.description}
                tags={post.tags}
                coverImage={post.coverImage}
                readingTime={post.readingTime}
            >
                <MDXRemote source={post.content} components={MDXComponents} />
            </BlogPost>

            {relatedPosts.length > 0 && <SimilarPosts posts={relatedPosts} />}
        </div>
    );
}
