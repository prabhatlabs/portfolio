import { NextRequest, NextResponse } from "next/server";

export type RouteHandler = (
    request: NextRequest,
    context: { params: Promise<any> }
) => Promise<NextResponse> | NextResponse;

export const withAuth = (handler: RouteHandler): RouteHandler => {
    return async (request: NextRequest, context: { params: Promise<any> }) => {
        const token = request.headers.get("x-auth-token");

        if (token !== process.env.API_SECRET) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        return handler(request, context);
    };
};
