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
        alternateName: "prabhatlabs",
        description: cleanedPersonDescription,
        url: envvars.BASE_URL,
        image: `${envvars.BASE_URL}${myInfo.imageUrl}`,
        sameAs: contactLinksArray.map((c) => c.url),
        jobTitle: "Software Developer",
        knowsAbout: [
            "TypeScript",
            "React",
            "Next.js",
            "Node.js",
            "Python",
            "Go",
            "PostgreSQL",
            "MongoDB",
            "Docker",
        ],
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
        author: {
            "@type": "Person",
            "@id": `${envvars.BASE_URL}/#person`,
        },
    },
    null,
    2,
);

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
        timeRequired: post.readingTime || undefined,
    };

    return JSON.stringify(schema, null, 2);
}

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

interface QA {
    question: string;
    answer: string;
}

export function buildFAQJsonLd(qaList: QA[]): string {
    const schema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: qaList.map((qa) => ({
            "@type": "Question",
            name: qa.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: qa.answer,
            },
        })),
    };

    return JSON.stringify(schema, null, 2);
}

interface Item {
    name: string;
    url?: string;
    description?: string;
    image?: string;
}

export function buildItemListJsonLd(
    items: Item[],
    listName: string,
): string {
    const schema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: listName,
        numberOfItems: items.length,
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "SoftwareApplication",
                name: item.name,
                url: item.url,
                description: item.description,
                ...(item.image ? { image: item.image } : {}),
                applicationCategory: "DeveloperApplication",
                operatingSystem: "Web",
            },
        })),
    };

    return JSON.stringify(schema, null, 2);
}

interface SoftwareApp {
    name: string;
    description: string;
    url?: string;
    imageUrl?: string;
    language?: string[];
    operatingSystem?: string;
}

export function buildSoftwareApplicationJsonLd(
    apps: SoftwareApp[],
): string {
    const schema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Software & Tools by Prabhat Mishra",
        itemListElement: apps.map((app, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "SoftwareApplication",
                name: app.name,
                description: app.description,
                url: app.url,
                image: app.imageUrl,
                applicationCategory: "DeveloperApplication",
                operatingSystem: app.operatingSystem || "Web",
                ...(app.language ? { programmingLanguage: app.language } : {}),
            },
        })),
    };

    return JSON.stringify(schema, null, 2);
}

export function buildWebPageJsonLd(
    title: string,
    description: string,
    url: string,
    about?: string,
): string {
    const schema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": url,
        name: title,
        description,
        url,
        ...(about ? { about: { "@type": "Thing", name: about } } : {}),
    };

    return JSON.stringify(schema, null, 2);
}
