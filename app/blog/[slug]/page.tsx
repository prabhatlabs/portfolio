import { BlogPost } from "@/components/blog/BlogPost";
import { MDXComponents } from "@/components/blog/MDXComponents";
import { RelatedPosts } from "@/components/blog/RelatedPosts";
import { getAllPosts, getPostBySlug } from "@/lib/github";
import { Metadata } from "next";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

const rehypePlugins = [
    rehypeSlug,
    [
        rehypeAutolinkHeadings,
        { behavior: "wrap" } satisfies Parameters<
            typeof rehypeAutolinkHeadings
        >[0],
    ],
    [rehypePrettyCode, { theme: "github-dark", keepBackground: true }],
];

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

    return {
        title: post.title,
        description: post.description,
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            publishedTime: post.date,
            tags: post.tags,
        },
        twitter: {
            card: "summary",
            title: post.title,
            description: post.description,
        },
    };
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const allPosts = await getAllPosts();
    const relatedPosts = allPosts
        .filter((p) => p.slug !== slug)
        .map((p) => ({
            ...p,
            overlap: p.tags.filter((tag) => post.tags.includes(tag)).length,
        }))
        .sort((a, b) => {
            if (b.overlap !== a.overlap) {
                return b.overlap - a.overlap;
            }
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        })
        .slice(0, 5);

    const options = {
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: rehypePlugins as never[],
        },
    };

    return (
        <div className="space-y-6 md:space-y-8">
            <BlogPost
                title={post.title}
                date={post.date}
                description={post.description}
                tags={post.tags}
            >
                <MDXRemote
                    source={post.content}
                    components={MDXComponents}
                    options={options}
                />
            </BlogPost>

            <RelatedPosts posts={relatedPosts} />
        </div>
    );
}
