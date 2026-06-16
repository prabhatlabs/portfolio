import { NextRequest, NextResponse } from "next/server";
import { getClientIp, getCountry, getOs, upseartVisitor } from "./service";

export async function POST(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    let ip = getClientIp(request);
    if (ip === "::1") {
        ip = "127.0.0.1"
    }

    const os = getOs(request.headers.get("user-agent"));
    const country = getCountry(request);
    const isDev = process.env.NODE_ENV === "development";
    const count = await upseartVisitor(slug, isDev);

    return NextResponse.json({ count, ip, os, country });
}
