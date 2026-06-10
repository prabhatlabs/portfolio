import { NextRequest, NextResponse } from "next/server";
import { upseartVisitor } from "./service";

export async function POST(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");
    const visitor = await upseartVisitor(slug);
    return NextResponse.json({ count: visitor });
}
