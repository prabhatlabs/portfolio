import { PostMeta } from "@/lib/blogs";
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
            const enriched = {
                ...blogMeta,
                date: new Date(blogMeta.date).toISOString(),
                readingTime,
            };

            const blogMetaJsonPath = path.join(blogDirPath, "blog-meta.json");
            await writeFile(
                blogMetaJsonPath,
                JSON.stringify(enriched, null, 2),
                "utf-8",
            );

            blogMetas.push(enriched as PostMeta);
        } catch (_) {
            console.warn(
                `Skipping folder "${blogDir}": blog-meta.json missing or invalid.`,
            );
            continue;
        }
    }

    blogMetas.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const registaryPath = path.join(blogsDirPath, "registary.json");
    await writeFile(
        registaryPath,
        JSON.stringify({ blogs: blogMetas }, null, 2),
        "utf-8",
    );
}
