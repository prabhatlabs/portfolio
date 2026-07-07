import type { PostMeta } from "./blogs";
import { contactLinksArray, myInfo } from "@/data/root";
import envvars from "@/lib/envvars";
const cleanedPersonDescription = myInfo.description.replace(
    /[*#_[\]()\\]/g,
    "",
);

export const personJsonLd = JSON.stringify(
    {
        "@context": "https://schema.org",
        "@type": "Person",
        name: myInfo.name,
        description: cleanedPersonDescription,
        url: envvars.BASE_URL,
        image: `${envvars.BASE_URL}${myInfo.imageUrl}`,
        sameAs: contactLinksArray.map((c) => c.url),
    },
    null,
    2,
);

const webSiteName = "Prabhat Mishra | Software Developer";
const webSiteDescription =
    "Software developer from India building fast, scalable web apps with TypeScript, React, Next.js, Node.js, Python & Go.";

export const webSiteJsonLd = JSON.stringify(
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: webSiteName,
        description: webSiteDescription,
        url: envvars.BASE_URL,
    },
    null,
    2,
);

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
            url: baseUrl,
        },
        publisher: {
            "@type": "Organization",
            name: "prabhatlabs",
            logo: {
                "@type": "ImageObject",
                url: `${baseUrl}/logo.webp`,
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
 * Build JSON-LD BreadcrumbList schema.
 */
export function buildBreadcrumbListJsonLd(
    items: Array<{ name: string; url: string }>,
): string {
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    };

    return JSON.stringify(schema, null, 2);
}

/**
 * Build JSON-LD Organization schema for the portfolio site.
 */
export function buildOrganizationJsonLd(
    name: string,
    description: string,
    url: string,
    logoUrl: string,
    sameAs: string[],
): string {
    const schema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name,
        description,
        url,
        logo: {
            "@type": "ImageObject",
            url: logoUrl,
        },
        sameAs,
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
