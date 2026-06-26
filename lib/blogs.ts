import matter from "gray-matter";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";

export interface PostMeta {
    slug: string;
    title: string;
    date: string;
    description: string;
    tags: string[];
    coverImage?: string;
    published: boolean;
    related?: string[];
}

export interface Post extends PostMeta {
    content: string;
}

const GITHUB_API_BASE = `https://api.github.com/repos/${GITHUB_REPO}`;

async function fetchFromGitHub(path: string) {
    const response = await fetch(
        `${GITHUB_API_BASE}${path}?ref=${GITHUB_BRANCH}`,
        {
            headers: {
                Authorization: `Bearer ${GITHUB_TOKEN}`,
                Accept: "application/vnd.github.v3+json",
            },
            next: { revalidate: 3600 },
        },
    );

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.statusText}`);
    }

    return response.json();
}

export async function getAllPosts(): Promise<PostMeta[]> {
    if (!GITHUB_TOKEN || !GITHUB_REPO) {
        console.warn(
            "GITHUB_TOKEN or GITHUB_REPO not set, returning empty array",
        );
        return [];
    }

    try {
        const fileData = await fetchFromGitHub(
            "/contents/data/blog-index.json",
        );
        const content = Buffer.from(fileData.content, "base64").toString(
            "utf-8",
        );
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
    if (!GITHUB_TOKEN || !GITHUB_REPO) {
        console.warn("GITHUB_TOKEN or GITHUB_REPO not set");
        return null;
    }

    try {
        const fileData = await fetchFromGitHub(
            `/contents/blogs/${slug}/meta.json`,
        );
        const content = Buffer.from(fileData.content, "base64").toString(
            "utf-8",
        );
        return JSON.parse(content) as PostMeta;
    } catch (error) {
        console.error(`Error fetching meta for ${slug}:`, error);
        return null;
    }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    if (!GITHUB_TOKEN || !GITHUB_REPO) {
        console.warn("GITHUB_TOKEN or GITHUB_REPO not set");
        return null;
    }

    try {
        const fileData = await fetchFromGitHub(
            `/contents/blogs/${slug}/blog.mdx`,
        );
        const content = Buffer.from(
            fileData.content.replace(/\n/g, ""),
            "base64",
        ).toString("utf-8");
        const { data: frontmatter, content: mdxContent } = matter(content);

        if (frontmatter.published === false) {
            return null;
        }

        return {
            slug,
            content: mdxContent,
            title: frontmatter.title || "",
            date: frontmatter.date || "",
            description: frontmatter.description || "",
            tags: frontmatter.tags || [],
            coverImage: frontmatter.coverImage,
            published: frontmatter.published ?? true,
            related: frontmatter.related || [],
        };
    } catch (error) {
        console.error(`Error fetching post ${slug}:`, error);
        return null;
    }
}
