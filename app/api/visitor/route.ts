import { NextRequest, NextResponse } from "next/server";
import {
    getCity,
    getClientIp,
    getCountry,
    getOs,
    getRegion,
    upseartVisitor,
} from "./service";

export async function POST(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    let ip = getClientIp(request);
    if (ip === "::1") {
        ip = "127.0.0.1";
    }

    const isDev = process.env.NODE_ENV === "development";
    const count = await upseartVisitor(slug, isDev);

    const os = getOs(request.headers.get("user-agent"));
    const country = getCountry(request);
    const region = getRegion(request);
    const city = getCity(request);

    return NextResponse.json({ count, ip, os, country, region, city });
}
