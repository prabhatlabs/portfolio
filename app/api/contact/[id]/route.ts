import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    const contactId = parseInt(id);

    if (isNaN(contactId)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    try {
        const contact = await prisma.contactForm.findUnique({
            where: { id: contactId },
        });

        if (!contact) {
            return NextResponse.json(
                { error: "Contact not found" },
                { status: 404 },
            );
        }

        return NextResponse.json(contact);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    const contactId = parseInt(id);

    if (isNaN(contactId)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    try {
        await prisma.contactForm.delete({
            where: { id: contactId },
        });
        return NextResponse.json({
            message: `Entry ${contactId} deleted successfully`,
        });
    } catch (error: any) {
        if (error.code === "P2025") {
            return NextResponse.json(
                { error: "Contact not found" },
                { status: 404 },
            );
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    const contactId = parseInt(id);

    if (isNaN(contactId)) {
        return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
    }

    try {
        const contact = await prisma.contactForm.update({
            where: { id: contactId },
            data: {
                status: "READ",
            },
        });
        return NextResponse.json(contact);
    } catch (error: any) {
        if (error.code === "P2025") {
            return NextResponse.json(
                { error: "Contact not found" },
                { status: 404 },
            );
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
