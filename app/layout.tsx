import { ThemeProvider } from "@/components/ui/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import Footer from "./_components/Footer";
import NavBar from "./_components/NavBar";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    variable: "--font-ibm-plex-mono",
});

export const metadata: Metadata = {
    title: "Prabhat Mishra | Software Developer",
    description:
        "Self-taught software developer building scalable applications with TypeScript, React, Node.js, Python, and Go. Specializing in modern web technologies and database architecture.",
    keywords: [
        "Prabhat Mishra",
        "software developer",
        "TypeScript developer",
        "React developer",
        "Node.js developer",
        "Python developer",
        "Go developer",
        "Next.js developer",
        "MERN developer",
        "PERN developer",
        "MongoDB",
        "PostgreSQL",
        "Express.js",
        "FastAPI",
        "Redux",
        "Prisma",
        "Docker",
        "self-taught developer",
        "software engineer",
        "Raipur developer",
        "Chhattisgarh developer",
    ],
    authors: [{ name: "Prabhat Mishra" }],
    creator: "Prabhat Mishra",
    publisher: "Prabhat Mishra",
    alternates: {
        canonical: "https://prabhatlabs.dev/",
    },
    openGraph: {
        title: "Prabhat Mishra | Software Developer",
        description:
            "Self-taught software developer building scalable applications with TypeScript, React, Node.js, Python, and Go. Specializing in modern web technologies and database architecture.",
        url: "https://prabhatlabs.dev/",
        siteName: "Prabhat Mishra - Software Developer",
        images: [
            {
                url: "https://prabhatlabs.dev/preview.png",
                width: 1200,
                height: 630,
                alt: "Prabhat Mishra - Software Developer Portfolio",
            },
        ],
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Prabhat Mishra | Software Developer",
        description:
            "Self-taught software developer building scalable applications with TypeScript, React, Node.js, Python, and Go.",
        images: ["https://prabhatlabs.dev/preview.png"],
        creator: "@prabhatlabs",
        site: "@prabhatlabs",
    },
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
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
                    defaultTheme="dark"
                    enableSystem
                >
                    <div className="transition-colors duration-500 ease-in-out relative max-w-6xl mx-auto min-h-dvh overflow-x-hidden">
                        <div className="border-r border-l">
                            <NavBar />
                            {children}
                        </div>
                        <Footer />
                    </div>
                    {/* <CrazyBtn className="fixed bottom-0 right-0 m-4" /> */}
                </ThemeProvider>
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
