import { prisma } from "@/lib/prisma";
import { withAuth } from "@/lib/proxy";
import { NextRequest, NextResponse } from "next/server";

export const GET = withAuth(async (request: NextRequest) => {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = 20;
    const skip = (page - 1) * limit;

    try {
        const contacts = await prisma.contactForm.findMany({
            skip,
            take: limit,
            orderBy: { timestamp: "desc" },
        });

        const total = await prisma.contactForm.count();

        return NextResponse.json({
            data: contacts,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
});

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { name, email, subject, body: messageBody } = body;

        if (!name || !email || !subject || !messageBody) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 },
            );
        }

        const contact = await prisma.contactForm.create({
            data: {
                name,
                email,
                subject,
                body: messageBody,
            },
        });

        return NextResponse.json(contact, { status: 201 });
    } catch (error: any) {
        if (error.code === "P2002") {
            return NextResponse.json(
                { error: "Email already exists" },
                { status: 400 },
            );
        }
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export const DELETE = withAuth(async () => {
    try {
        await prisma.contactForm.deleteMany();
        return NextResponse.json({
            message: "All entries deleted successfully",
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
});

export const PATCH = withAuth(async () => {
    try {
        await prisma.contactForm.updateMany({
            data: {
                status: "READ",
            },
        });
        return NextResponse.json({ message: "All entries marked as READ" });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
});
