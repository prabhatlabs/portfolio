import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Requests | Admin",
    description: "Manage contact requests.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function RequestsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
