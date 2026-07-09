import { readFile } from "fs/promises";
import matter from "gray-matter";
import path from "path/posix";

export interface PostMeta {
    slug: string;
    title: string;
    date: string;
    description: string;
    tags: string[];
    coverImage?: string;
    published: boolean;
    related?: string[];
    readingTime?: string;
}

export interface Post extends PostMeta {
    content: string;
}

export async function getAllPosts(): Promise<PostMeta[]> {
    try {
        const filePath = path.join(
            process.cwd(),
            "contents",
            "blogs",
            "registary.json",
        );
        const content = await readFile(filePath, "utf-8");
        const data = JSON.parse(content);
        return ((data.blogs || []) as PostMeta[]).filter((b) => b.published);
    } catch (error) {
        console.error("Error fetching blog-index.json:", error);
        return [];
    }
}

export async function getPostMetaBySlug(
    slug: string,
): Promise<PostMeta | null> {
    try {
        const filePath = path.join(
            process.cwd(),
            "contents",
            "blogs",
            slug,
            "blog-meta.json",
        );
        const content = await readFile(filePath, "utf-8");
        return JSON.parse(content) as PostMeta;
    } catch (error) {
        console.error(`Error fetching meta for ${slug}:`, error);
        return null;
    }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    try {
        const postMetaJson = await getPostMetaBySlug(slug);
        if (!postMetaJson || postMetaJson.published === false) return null;

        const content = await readFile(
            path.join(process.cwd(), "contents", "blogs", slug, "content.mdx"),
            "utf-8",
        );
        const { content: mdxContent } = matter(content);

        return {
            content: mdxContent,
            ...postMetaJson,
        };
    } catch (error) {
        console.error(`Error fetching post ${slug}:`, error);
        return null;
    }
}
