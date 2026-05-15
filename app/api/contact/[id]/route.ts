import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { withAuth } from "@/lib/proxy";

export const GET = withAuth(
    async (
        _request: NextRequest,
        { params }: { params: Promise<{ id: string }> },
    ) => {
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
    },
);

export const POST = withAuth(
    async (
        request: NextRequest,
        { params }: { params: Promise<{ id: string }> },
    ) => {
        const { id } = await params;
        const contactId = parseInt(id);

        if (isNaN(contactId)) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        try {
            const body = await request.json();
            const { name, email, subject, body: messageBody, status } = body;

            const contact = await prisma.contactForm.upsert({
                where: { id: contactId },
                update: {
                    name,
                    email,
                    subject,
                    body: messageBody,
                    status: status || "UNREAD",
                },
                create: {
                    id: contactId,
                    name,
                    email,
                    subject,
                    body: messageBody,
                    status: status || "UNREAD",
                },
            });

            return NextResponse.json(contact);
        } catch (error: any) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    },
);

export const DELETE = withAuth(
    async (
        _request: NextRequest,
        { params }: { params: Promise<{ id: string }> },
    ) => {
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
    },
);

export const PATCH = withAuth(
    async (
        _request: NextRequest,
        { params }: { params: Promise<{ id: string }> },
    ) => {
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
    },
);
