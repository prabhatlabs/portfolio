import { Metadata } from "next";
import { getAllPosts } from "@/lib/github";
import { BlogCard } from "@/components/blog/BlogCard";

export const revalidate = 3600;

export const metadata: Metadata = {
    title: "Blog",
    description: "Articles about development, programming, and tech.",
};

export default async function BlogPage() {
    const posts = await getAllPosts();

    return (
        <div className="container py-12">
            <h1 className="text-4xl font-bold mb-8">Blog</h1>
            {posts.length === 0 ? (
                <p className="text-muted-foreground">
                    No posts yet. Add some .mdx files to your blogs folder.
                </p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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