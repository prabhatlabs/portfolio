import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const visitor = await prisma.siteVisitor.findUnique({ where: { id: 1 } });
  return NextResponse.json({ count: visitor?.counter ?? 0 });
}

export async function POST() {
  const visitor = await prisma.siteVisitor.upsert({
    where: { id: 1 },
    update: { counter: { increment: 1 } },
    create: { id: 1, counter: 1 },
  });
  return NextResponse.json({ count: visitor.counter });
}
