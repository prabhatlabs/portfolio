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
}

export interface Post extends PostMeta {
    content: string;
}

const GITHUB_API_BASE = `https://api.github.com/repos/${GITHUB_REPO}`;
async function fetchFromGitHub(path: string) {
    const response = await fetch(`${GITHUB_API_BASE}${path}`, {
        headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 },
    });

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.statusText}`);
    }

    return response.json();
}

export async function getAllPosts(): Promise<PostMeta[]> {
    if (!GITHUB_TOKEN) {
        console.warn("GITHUB_TOKEN not set, returning empty array");
        return [];
    }

    try {
        const data = await fetchFromGitHub("/contents/blogs");
        const posts = await Promise.all(
            (data as Array<{ name: string }>)
                // ---- trusting that the files are mdx only ----
                // .filter((file) => file.name.endsWith(".mdx"))
                .map(async (file) => {
                    const slug = file.name.replace(".mdx", "");
                    const fileData = await fetchFromGitHub(
                        `/contents/blogs/${file.name}`,
                    );
                    const content = Buffer.from(
                        fileData.content,
                        "base64",
                    ).toString("utf-8");
                    const { data: frontmatter } = matter(content);

                    if (!frontmatter.published) {
                        return null;
                    }

                    return {
                        slug,
                        title: frontmatter.title || "",
                        date: frontmatter.date || "",
                        description: frontmatter.description || "",
                        tags: frontmatter.tags || [],
                        coverImage: frontmatter.coverImage,
                        published: frontmatter.published ?? true,
                    } as PostMeta;
                }),
        );

        return posts
            .filter((p): p is PostMeta => p !== null)
            .sort(
                (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime(),
            );
    } catch (error) {
        console.error("Error fetching posts:", error);
        return [];
    }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
    if (!GITHUB_TOKEN) {
        console.warn("GITHUB_TOKEN not set");
        return null;
    }

    try {
        const fileData = await fetchFromGitHub(`/contents/blogs/${slug}.mdx`);
        const content = Buffer.from(fileData.content, "base64").toString(
            "utf-8",
        );
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
        };
    } catch (error) {
        console.error(`Error fetching post ${slug}:`, error);
        return null;
    }
}
