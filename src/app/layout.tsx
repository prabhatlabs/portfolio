import { ThemeProvider } from "@/components/ui/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
    title: "Prabhat | Software Developer",
    description:
        "I'm a self-taught software developer, buildling software the way some people build puzzles, piece by piece, until everything clicks.",
    openGraph: {
        title: "Prabhat | Software Developer",
        description:
            "I'm a self-taught software developer, buildling software the way some people build puzzles, piece by piece, until everything clicks.",
        url: "https://prabhatlabs.dev/",
        siteName: "Prabhat Mishra",
        images: [
            {
                url: "https://prabhatlabs.dev/preview.png",
                width: 1200,
                height: 630,
                alt: "Preview",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary",
        title: "Prabhat | Software Developer",
        description:
            "I'm a self-taught software developer, buildling software the way some people build puzzles, piece by piece, until everything clicks.",
        images: ["https://prabhatlabs.dev/preview.png"],
        creator: "@prabhatlabs",
    },
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
            <body
                className={`antialiased hideScrollbar ${ibmPlexMono.className}`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <div className="transition-colors duration-500 ease-in-out">
                        {children}
                    </div>
                    {/* <CrazyBtn className="fixed bottom-0 right-0 m-4" /> */}
                </ThemeProvider>
                <Analytics />
            </body>
        </html>
    );
}
