import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const visitor = await prisma.blogVisitor.findUnique({ where: { slug } });
  return NextResponse.json({ count: visitor?.counter ?? 0 });
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const visitor = await prisma.blogVisitor.upsert({
    where: { slug },
    update: { counter: { increment: 1 } },
    create: { slug, counter: 1 },
  });
  return NextResponse.json({ count: visitor.counter });
}
