import { PostMeta } from "@/lib/github";
import Link from "next/link";
import { BlogCard } from "./BlogCard";

interface RelatedPostsProps {
    posts: PostMeta[];
}

export function SimilarPosts({ posts }: RelatedPostsProps) {
    if (posts.length === 0) return null;

    return (
        <section className="pt-6 md:pt-8 border-t border-border">
            <div className="flex items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold">Similar Posts</h2>
                <Link
                    href={"/blog"}
                    className="text-sm text-muted-foreground underline hover:text-blue-500 italic flex items-center gap-2"
                >
                    {/*<ArrowLeft className="size-4" />*/}
                    <span>All Blogs</span>
                </Link>
            </div>
            <div className="grid gap-4">
                {posts.map((post) => (
                    <BlogCard key={post.slug} {...post} />
                ))}
            </div>
        </section>
    );
}
