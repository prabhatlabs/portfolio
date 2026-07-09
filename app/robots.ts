import envvars from "@/lib/envvars";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/api/", "/requests"],
            },
            {
                userAgent: "OAI-SearchBot",
                allow: "/",
            },
            {
                userAgent: "PerplexityBot",
                allow: "/",
            },
            {
                userAgent: "ClaudeBot",
                allow: "/",
            },
            {
                userAgent: "Google-Extended",
                allow: "/",
            },
            {
                userAgent: "GoogleOther",
                allow: "/",
            },
            {
                userAgent: "ChatGPT-User",
                allow: "/",
            },
        ],
        sitemap: `${envvars.BASE_URL}/sitemap.xml`,
    };
}
