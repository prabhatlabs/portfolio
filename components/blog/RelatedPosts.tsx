import { PostMeta } from "@/lib/github";
import { BlogCard } from "./BlogCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface RelatedPostsProps {
    posts: PostMeta[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
    if (posts.length === 0) return null;

    return (
        <section className="pt-6 md:pt-8 border-t border-border">
            <div className="flex items-center justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold">Related Posts</h2>
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
