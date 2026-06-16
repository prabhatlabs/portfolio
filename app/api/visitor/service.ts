import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function upseartVisitor(slug: string | null, readOnly = false) {
    if (slug) {
        if (readOnly) {
            const visitor = await prisma.blogVisitor.findUnique({ where: { slug } });
            return visitor?.counter ?? 0;
        }
        const visitor = await prisma.blogVisitor.upsert({
            where: { slug },
            update: { counter: { increment: 1 } },
            create: { slug, counter: 1 },
        });
        return visitor.counter;
    }

    if (readOnly) {
        const visitor = await prisma.siteVisitor.findUnique({ where: { id: 1 } });
        return visitor?.counter ?? 0;
    }
    const visitor = await prisma.siteVisitor.upsert({
        where: { id: 1 },
        update: { counter: { increment: 1 } },
        create: { id: 1, counter: 1 },
    });
    return visitor.counter;
}

export function getClientIp(request: NextRequest): string {
    const headers = request.headers;
    return (
        headers.get("cf-connecting-ip") ??
        headers.get("x-real-ip") ??
        headers.get("x-forwarded-for")?.split(",")[0].trim() ??
        "Unknown"
    );
}

export function getOs(userAgent: string | null): string {
    if (!userAgent) return "Unknown";
    if (/windows nt/i.test(userAgent)) return "Windows";
    if (/macintosh|mac os x/i.test(userAgent)) return "macOS";
    if (/iphone|ipad|ipod/i.test(userAgent)) return "iOS";
    if (/android/i.test(userAgent)) return "Android";
    if (/linux/i.test(userAgent)) return "Linux";
    if (/cros/i.test(userAgent)) return "ChromeOS";
    return "Unknown";
}

export function getCountry(request: NextRequest): string {
    const cfCountry = request.headers.get("cf-ipcountry");
    if (cfCountry && cfCountry !== "XX") return cfCountry;

    const vercelCountry = request.headers.get("x-vercel-ip-country");
    if (vercelCountry) return vercelCountry;

    return "Unknown";
}
