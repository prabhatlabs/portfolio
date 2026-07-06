import { readdir, readFile, writeFile } from "fs/promises";
import matter from "gray-matter";
import path from "path/posix";

/**
 * Calculate approximate reading time from a markdown string.
 * Assumes ~200 words per minute and strips markdown syntax for counting.
 */
export function calculateReadingTime(markdownContent: string): string {
    // Strip markdown — remove headings markers, bold, italic, code blocks, links, images
    const cleaned = markdownContent
        .replace(/```[\s\S]*?```/g, "")
        .replace(/`[^`]+`/g, "")
        .replace(/!\[.*?\]\(.*?\)/g, "")
        .replace(/\[(.*?)\]\(.*?\)/g, "$1")
        .replace(/[#*_~>|\-\+\=]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    const wordCount = cleaned.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(wordCount / 200));

    return `${minutes} min read`;
}

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

/*
 * <--- Note there's a script that automatically runs this function on build. --->
 * <--- as deployed in vercel, build time generate files are not included in all the edge environments. --->
 * <--- So, generate before pushing to the repository. --->
 * Reads all the mdx present in `./contents/blogs/*` and generates a `registary.json` file in the root of the blogs folder.
 * And `blog-meta.json` files in each blog folder.
 */
export async function generateBlogJson(): Promise<void> {
    const blogsDirPath = path.join(process.cwd(), "contents", "blogs");
    const blogsDirs = (
        await readdir(blogsDirPath, {
            withFileTypes: true,
        })
    )
        .filter((file) => file.isDirectory())
        .map((file) => file.name);
    const blogMetas: PostMeta[] = [];

    for (const blogDir of blogsDirs) {
        const blogDirPath = path.join(blogsDirPath, blogDir);

        try {
            const contentMdxPath = path.join(blogDirPath, "content.mdx");
            const blogMdxContent = await readFile(contentMdxPath, "utf-8");
            const { data: blogMeta, content: mdxBody } = matter(blogMdxContent);

            // Add reading time from the markdown content (excluding frontmatter)
            const readingTime = calculateReadingTime(mdxBody);
            const enriched = { ...blogMeta, readingTime };

            const blogMetaJsonPath = path.join(blogDirPath, "blog-meta.json");
            await writeFile(
                blogMetaJsonPath,
                JSON.stringify(enriched, null, 2),
                "utf-8",
            );

            blogMetas.push(enriched as PostMeta);
        } catch (err) {
            console.warn(
                `Skipping folder "${blogDir}": blog-meta.json missing or invalid.`,
            );
            continue;
        }
    }

    const registaryPath = path.join(blogsDirPath, "registary.json");
    await writeFile(
        registaryPath,
        JSON.stringify({ blogs: blogMetas }, null, 2),
        "utf-8",
    );
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
