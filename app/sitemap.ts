import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/github";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getAllPosts();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://prabhatlabs.dev";

    const blogPosts = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
        ...blogPosts,
    ];
}