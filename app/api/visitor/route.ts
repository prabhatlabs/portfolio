import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (slug) {
    const visitor = await prisma.blogVisitor.upsert({
      where: { slug },
      update: { counter: { increment: 1 } },
      create: { slug, counter: 1 },
    });
    return NextResponse.json({ count: visitor.counter });
  }

  const visitor = await prisma.siteVisitor.upsert({
    where: { id: 1 },
    update: { counter: { increment: 1 } },
    create: { id: 1, counter: 1 },
  });
  return NextResponse.json({ count: visitor.counter });
}
