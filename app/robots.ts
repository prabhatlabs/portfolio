import envvars from "@/lib/envvars";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
            disallow: ["/api/", "/requests"],
        },
        sitemap: `${envvars.BASE_URL}/sitemap.xml`,
    };
}
