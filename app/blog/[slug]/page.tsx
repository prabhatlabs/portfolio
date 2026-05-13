import { BlogPost } from "@/components/blog/BlogPost";
import { MDXComponents } from "@/components/blog/MDXComponents";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { getAllPosts, getPostBySlug, getPostMetaBySlug } from "@/lib/github";
import { getFullImageUrl } from "@/lib/image-helper";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
// import rehypeAutolinkHeadings from "rehype-autolink-headings";
// import rehypePrettyCode from "rehype-pretty-code";
// import rehypeSlug from "rehype-slug";
// import remarkGfm from "remark-gfm";

// const rehypePlugins = [
//     rehypeSlug,
//     [
//         rehypeAutolinkHeadings,
//         { behavior: "wrap" } satisfies Parameters<
//             typeof rehypeAutolinkHeadings
//         >[0],
//     ],
//     [rehypePrettyCode, { theme: "github-dark", keepBackground: false }],
// ];

export const revalidate = 3600;

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

    // const options = {
    //     mdxOptions: {
    //         remarkPlugins: [remarkGfm],
    //         rehypePlugins: rehypePlugins as never[],
    //     },
    // };

    return (
        <div className="space-y-6 md:space-y-8">
            <div className="max-w-3xl mt-6 md:mt-8 mx-auto flex justify-between items-center gap-6">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Link href={"/"} className="hover:underline">
                        prabhatlabs.dev
                    </Link>
                    <span>•</span>
                    <Link href={"/blog"} className="hover:underline">
                        All Blogs
                    </Link>
                </div>
                <ThemeToggle />
            </div>

            <BlogPost
                title={post.title}
                date={post.date}
                description={post.description}
                tags={post.tags}
                coverImage={post.coverImage}
            >
                <MDXRemote
                    source={post.content}
                    components={MDXComponents}
                    // options={options}
                />
            </BlogPost>

            {relatedPosts.length > 0 && <RelatedPosts posts={relatedPosts} />}
        </div>
    );
}
