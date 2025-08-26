import { ThemeProvider } from "@/components/ui/theme-provider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Prabhat | Software Developer",
    description:
        "I'm a self-taught software developer, buildling software the way some people build puzzles, piece by piece, until everything clicks.",
    openGraph: {
        title: "Prabhat | Software Developer",
        description:
            "I'm a self-taught software developer, buildling software the way some people build puzzles, piece by piece, until everything clicks.",
        url: "https://prabhatmishra.vercel.app/",
        siteName: "Prabhat Mishra",
        images: [
            {
                url: "https://prabhatmishra.vercel.app/preview.png",
                width: 1200,
                height: 630,
                alt: "Preview",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Prabhat | Software Developer",
        description:
            "I'm a self-taught software developer, buildling software the way some people build puzzles, piece by piece, until everything clicks.",
        images: ["https://prabhatmishra.vercel.app/preview.png"],
        creator: "@prabhatsuntoh",
    },
};

import localFont from "next/font/local";

const myFont = localFont({
    src: [
        {
            path: "./_fonts/SF_Pro_Semibold_Rounded.otf",
            weight: "600",
            style: "sf-semibold-rounded",
        },
    ],
});

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
            <body className={`${myFont.className} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
