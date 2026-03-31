import { ThemeProvider } from "@/components/ui/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const dmsans = DM_Sans({
    subsets: ["latin"],
    variable: "--font-dmsans",
});

const geist_mono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-geist-mono",
    weight: "500",
});

export const metadata: Metadata = {
    metadataBase: new URL("https://prabhatlabs.dev"),
    title: {
        default: "Prabhat Mishra | Software Developer",
        template: "%s | Prabhat Mishra",
    },
    description:
        "Prabhat Mishra is a software developer from India specializing in TypeScript, React, Next.js, Node.js, Python, and Go. Available for freelance projects and full-time roles.",
    keywords: [
        // Name + brand
        "Prabhat Mishra",
        "Prabhat Mishra developer",
        "Prabhat Mishra portfolio",
        "prabhatlabs",
        "prabhatlabs.dev",

        // Role variants (how recruiters search)
        "software developer",
        "full-stack developer",
        "full stack developer India",
        "software developer India",
        "software engineer India",
        "web developer India",
        "backend developer India",
        "frontend developer India",
        "freelance developer India",
        "hire software developer India",
        "remote software developer India",

        // Tech stack — specific (high intent)
        "TypeScript developer",
        "React developer",
        "Next.js developer",
        "Node.js developer",
        "Python developer",
        "Go developer",
        "Golang developer",
        "Express.js developer",
        "FastAPI developer",
        "REST API developer",
        "GraphQL developer",

        // Databases & ORMs
        "PostgreSQL developer",
        "MongoDB developer",
        "Prisma ORM",
        "Drizzle ORM",
        "database architecture",
        "SQL developer",
        "NoSQL developer",

        // Stacks / patterns
        "MERN stack developer",
        "PERN stack developer",
        "JAMstack developer",
        "microservices developer",
        "serverless developer",

        // Tools & DevOps
        "Docker developer",
        "DevOps engineer India",
        "CI/CD pipeline",
        "Git developer",
        "Linux developer",

        // State management & ecosystem
        "Redux developer",
        "React Query",
        "Tailwind CSS developer",

        // Intent-based long-tail
        "scalable web application developer",
        "full stack developer for startups",
        "open to work software developer",
        "hire full stack developer",
        "best software developer portfolio",

        // Geo — city + state + country
        "Chhattisgarh developer",
        "Madhya Pradesh developer",
        "Central India developer",
        "Indian software developer",
        "developer from India",

        // Self-taught angle (niche + differentiating)
        "self-taught software developer",
        "self-taught full stack developer",
        "self-taught programmer India",
    ],

    authors: [{ name: "Prabhat Mishra", url: "https://prabhatlabs.dev" }],
    creator: "Prabhat Mishra",
    publisher: "Prabhat Mishra",
    category: "Technology",
    classification: "Software Development Portfolio",

    icons: {
        icon: "/logo.webp",
        shortcut: "/logo.webp",
        apple: "/logo.webp",
    },

    alternates: {
        canonical: "https://prabhatlabs.dev/",
    },

    // Add your Google Search Console verification token here
    verification: {
        google: "google-site-verification=7BjQe7yKCUwNzGtw7BjtwYD-nca1Mofz8H5n_GW92Ikyour-google-verification-token",
    },

    openGraph: {
        title: "Prabhat Mishra | Software Developer",
        description:
            "Software developer from India building fast, scalable web apps with TypeScript, React, Next.js, Node.js, Python & Go. Open to freelance and full-time opportunities.",
        url: "https://prabhatlabs.dev/",
        siteName: "Prabhat Mishra — Software Developer",
        images: [
            {
                url: "https://prabhatlabs.dev/preview.webp",
                width: 1200,
                height: 630,
                alt: "Prabhat Mishra — Software Developer",
            },
        ],
        locale: "en_US",
        type: "website",
    },

    twitter: {
        card: "summary_large_image",
        title: "Prabhat Mishra | Software Developer",
        description:
            "Software dev from India. TypeScript · React · Next.js · Node.js · Python · Go. Open to freelance & full-time roles.",
        images: ["https://prabhatlabs.dev/preview.webp"],
        creator: "@prabhatlabs",
        site: "@prabhatlabs",
    },

    robots: {
        index: true,
        follow: true,
        nocache: false, // nocache: true was preventing Google from caching your pages — bad for SEO
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
                className={`antialiased no-scrollbar ${dmsans.className} ${geist_mono.variable}`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                >
                    {children}
                </ThemeProvider>
                <Analytics />
                <SpeedInsights />
                <Script
                    src="https://cdn.jsdelivr.net/gh/prabhatlabs/rum-core-client-script@1.0.9/dist/rum-core.js"
                    data-worker="https://rum-core-worker.rumcore.workers.dev"
                    data-key="X74ymKYEqzFKWeVV7HxY7cqI"
                />
            </body>
        </html>
    );
}
