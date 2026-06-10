import { prisma } from "@/lib/prisma";

export async function upseartVisitor(slug: string | null) {
    if (slug) {
        const visitor = await prisma.blogVisitor.upsert({
            where: { slug },
            update: { counter: { increment: 1 } },
            create: { slug, counter: 1 },
        });
        return visitor.counter;
    }

    const visitor = await prisma.siteVisitor.upsert({
        where: { id: 1 },
        update: { counter: { increment: 1 } },
        create: { id: 1, counter: 1 },
    });
    return visitor.counter;
}
