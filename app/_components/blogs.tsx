import { getAllPosts, PostMeta } from "@/lib/github";
import { getFullImageUrl } from "@/lib/image-helper";
import { GeistPixelSquare } from "geist/font/pixel";
import Image from "next/image";
import Link from "next/link";
import { VscLinkExternal } from "react-icons/vsc";
import { Fragment } from "react/jsx-runtime";

function BlogCard({
    blog,
    idx,
    length,
}: {
    blog: PostMeta;
    idx: number;
    length: number;
}) {
    const coverImageUrl = getFullImageUrl(blog.coverImage);
    return (
        <Link
            href={`/blog/${blog.slug}`}
            key={blog.title}
            className={`${idx === 0 ? "" : "border-l"} z-10 p-2 md:p-3 flex flex-col gap-2 justify-between min-w-75`}
        >
            <div className="">
                <Image
                    src={coverImageUrl!}
                    alt={blog.title}
                    width={300}
                    height={160}
                    className="w-full h-fit aspect-video border"
                />
                <div className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground mt-2">
                    <time dateTime={blog.date}>
                        {new Date(blog.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </time>
                    {blog.tags.map((t) => (
                        <Fragment key={t}>
                            <span>•</span>
                            <span className="text-foreground">{t}</span>
                        </Fragment>
                    ))}
                </div>
                <h3 className="font-semibold my-1">{blog.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-3">
                    {blog.description}
                </p>
            </div>
            <div className="space-y-2">
                <div className="flex gap-px items-center">
                    <span className="border group text-sm bg-foreground/10 px-1.5 py-0.5 flex items-center gap-2 justify-center">
                        <VscLinkExternal className="size-4 group-hover:-translate-y-1/4 group-hover:translate-x-1/4 transition-transform duration-300" />
                        Full Blog
                    </span>
                </div>
            </div>
        </Link>
    );
}

export async function Blogs() {
    const posts = await getAllPosts();
    if (posts.length === 0) return null;
    return (
        <div>
            <h2 className={`p-4 sm:p-6 mt-16 sm:mt-20 md:mt-24 border-y text-3xl md:text-5xl ${GeistPixelSquare.className}`}>
                <span>
                    B
                </span>
                <span
                    className="text-muted-foreground"
                >
                    logs
                </span>
            </h2>
            <div className="relative w-full p-4 border-b overflow-hidden">
                <div className="flex w-full overflow-auto border">
                    <span className="absolute -top-1 left-0 my-1 mx-4 font-mono text-[10px] text-muted-foreground/50">
                        flex w-full overflow-auto
                    </span>
                    {posts.slice(0, 5).map((blog, index) => (
                        <BlogCard
                            blog={blog}
                            idx={index}
                            key={index}
                            length={posts.length}
                        />
                    ))}
                    <div
                        className={`border-l z-10 p-2 md:p-3 flex flex-col gap-1 items-center justify-center min-w-75`}
                    >
                        <span className="border group text-sm bg-foreground/10 px-1.5 py-0.5 flex items-center gap-2 justify-center">
                            <VscLinkExternal className="size-4 group-hover:-translate-y-1/4 group-hover:translate-x-1/4 transition-transform duration-300" />
                            Blogs
                        </span>
                        <p className="text-sm text-muted-foreground">
                            More coming soon...
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
