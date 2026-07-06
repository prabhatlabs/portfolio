import type { PostMeta } from "./blogs";

/**
 * Build JSON-LD structured data for a blog post page.
 * Used for Google Rich Results — Article / BlogPosting schema.
 */
export function buildBlogPostJsonLd(
    post: PostMeta & { content?: string },
    baseUrl: string,
): string {
    const url = `${baseUrl}/blog/${post.slug}`;
    const imageUrl = post.coverImage
        ? post.coverImage.startsWith("http")
            ? post.coverImage
            : `${baseUrl}${post.coverImage}`
        : `${baseUrl}/preview.webp`;

    const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        author: {
            "@type": "Person",
            name: "Prabhat Mishra",
            url: "https://prabhatlabs.dev",
        },
        publisher: {
            "@type": "Organization",
            name: "prabhatlabs",
            logo: {
                "@type": "ImageObject",
                url: "https://prabhatlabs.dev/logo.webp",
            },
        },
        image: {
            "@type": "ImageObject",
            url: imageUrl,
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": url,
        },
        articleSection: post.tags?.join(", ") || "",
        keywords: post.tags?.join(", ") || "",
        wordCount: post.tags?.length || 0,
    };

    return JSON.stringify(schema, null, 2);
}

/**
 * Build JSON-LD Person schema for the portfolio home page.
 */
export function buildPersonJsonLd(
    name: string,
    description: string,
    baseUrl: string,
    imageUrl: string,
    sameAs: string[],
): string {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name,
        description: description.replace(/[*#_[\]()\\]/g, ""),
        url: baseUrl,
        image: imageUrl.startsWith("http")
            ? imageUrl
            : `${baseUrl}${imageUrl}`,
        sameAs,
    };

    return JSON.stringify(schema, null, 2);
}

/**
 * Build JSON-LD WebSite schema for the portfolio site.
 */
export function buildWebSiteJsonLd(
    name: string,
    description: string,
    baseUrl: string,
): string {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name,
        description,
        url: baseUrl,
    };

    return JSON.stringify(schema, null, 2);
}

/**
 * Build JSON-LD for the blog list page (CollectionPage / ItemList).
 */
export function buildBlogListJsonLd(
    posts: PostMeta[],
    baseUrl: string,
): string {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "@id": `${baseUrl}/blog`,
        name: "Prabhat Mishra — Blog",
        description:
            "Thoughts, learnings, and things I found worth writing down.",
        url: `${baseUrl}/blog`,
        blogPost: posts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            url: `${baseUrl}/blog/${post.slug}`,
        })),
    };

    return JSON.stringify(schema, null, 2);
}
