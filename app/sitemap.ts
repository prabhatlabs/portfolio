import envvars from "@/lib/envvars";
import { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blogs";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = await getAllPosts();

    const blogPosts = posts.map((post) => ({
        url: `${envvars.BASE_URL}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "weekly" as const,
        priority: 0.7,
    }));

    return [
        {
            url: envvars.BASE_URL,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 1,
        },
        {
            url: `${envvars.BASE_URL}/blog`,
            lastModified: new Date(),
            changeFrequency: "daily",
            priority: 0.8,
        },
        ...blogPosts,
    ];
}
