import { ThemeProvider } from "@/components/ui/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import JsonLd from "@/components/JsonLd";
import envvars from "@/lib/envvars";
import { myInfo } from "@/data/root";
import { buildOrganizationJsonLd } from "@/lib/json-ld";
import type { Metadata } from "next";
import { DM_Sans, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { GeistPixelSquare } from "geist/font/pixel";
import { GoogleAnalytics } from "@next/third-parties/google";

const dmsans = DM_Sans({
    subsets: ["latin"],
    variable: "--font-dmsans",
    display: "swap",
});

const geist_mono = Geist_Mono({
    subsets: ["latin"],
    variable: "--font-geist-mono",
    weight: "500",
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL(envvars.BASE_URL),
    title: {
        default: "Prabhat Mishra | Software Developer",
        template: "%s | Prabhat Mishra",
    },
    description:
        "Portfolio of Prabhat Mishra, a full stack software developer from India specializing in TypeScript, React, Next.js, Node.js, Python, and Go. I build fast, scalable SaaS products and am available for freelance projects and full-time roles. Explore my work, blog, and terminal portfolio.",
    keywords: [
        "Prabhat Mishra",
        "Prabhat Mishra developer",
        "Prabhat Mishra portfolio",
        "Prabhat Mishra software engineer",
        "Prabhat Mishra full stack developer",
        "prabhatlabs",
        "prabhatlabs.dev",
        "software developer",
        "software engineer",
        "full stack developer",
        "full-stack developer",
        "frontend developer",
        "backend developer",
        "web developer",
        "web application developer",
        "JavaScript developer",
        "TypeScript developer",
        "Python developer",
        "Go developer",
        "full stack developer India",
        "software developer India",
        "software engineer India",
        "web developer India",
        "backend developer India",
        "frontend developer India",
        "freelance developer India",
        "freelance full stack developer",
        "freelance web developer",
        "remote software developer",
        "remote full stack developer",
        "remote backend developer",
        "remote frontend developer",
        "hire software developer India",
        "hire full stack developer India",
        "remote software developer India",
        "remote full stack developer India",
        "React developer",
        "Next.js developer",
        "Node.js developer",
        "Express.js developer",
        "TypeScript developer",
        "JavaScript developer",
        "Python developer",
        "Go developer",
        "Golang developer",
        "FastAPI developer",
        "Flask developer",
        "REST API developer",
        "GraphQL developer",
        "WebSocket developer",
        "Socket.io developer",
        "Redis developer",
        "Bun developer",
        "Elysia developer",
        "Hono developer",
        "Angular developer",
        "Tailwind CSS developer",
        "Shadcn UI developer",
        "Framer Motion developer",
        "Zustand developer",
        "Redux developer",
        "PostgreSQL developer",
        "MongoDB developer",
        "SQLite developer",
        "Prisma ORM",
        "Drizzle ORM",
        "Turso database",
        "Neon database",
        "database architect",
        "SQL developer",
        "NoSQL developer",
        "database optimization",
        "MERN stack developer",
        "PERN stack developer",
        "T3 stack developer",
        "Next.js full stack",
        "JAMstack developer",
        "microservices developer",
        "microservices architecture",
        "serverless developer",
        "event-driven architecture",
        "Pub/Sub pattern",
        "real-time applications",
        "RAG developer",
        "AI application developer",
        "Docker developer",
        "DevOps engineer",
        "DevOps engineer India",
        "CI/CD pipeline",
        "Git developer",
        "Linux developer",
        "Cloudflare developer",
        "Cloudflare Workers",
        "Cloudinary developer",
        "Vercel developer",
        "Postman developer",
        "React Query",
        "TanStack Query",
        "Redux developer",
        "Zustand developer",
        "Framer Motion",
        "Tailwind CSS",
        "scalable web application developer",
        "full stack developer for startups",
        "open to work software developer",
        "hire full stack developer",
        "hire remote developer India",
        "best software developer portfolio",
        "software developer portfolio 2026",
        "looks good developer portfolio",
        "minimal developer portfolio",
        "hire Node.js developer India",
        "hire Python developer India",
        "hire React developer India",
        "hire Next.js developer",
        "freelance web developer rates India",
        "affordable software developer India",
        "senior full stack developer India",
        "experienced software developer India",
        "Chhattisgarh developer",
        "Raipur developer",
        "Madhya Pradesh developer",
        "Indore developer",
        "Central India developer",
        "Indian software developer",
        "developer from India",
        "best developer India",
        "top software developer India",
        "software developer Chhattisgarh",
        "self-taught software developer",
        "self-taught full stack developer",
        "self-taught programmer India",
        "self-taught developer success story",
        "no CS degree developer",
        "self taught developer portfolio",
        "SaaS developer",
        "B2B SaaS developer India",
        "privacy-first developer",
        "performance optimization developer",
        "web vitals optimization",
        "full stack SaaS architecture",
        "real-time application developer",
        "link management developer",
        "PDF processing developer",
        "media transcoding developer",
        "threat intelligence developer",
        "IP geolocation developer",
        "RAG pipeline developer",
        "chat application developer",
        "classroom platform developer",
        "developers for hire India",
        "top software developers India",
        "freelance programmers India",
        "contract developer India",
        "remote developer for hire",
        "full stack consultant India",
        "tech consultant India",
        "startup tech lead India",
        "software development services India",
        "web development services India",
    ],

    authors: [{ name: "Prabhat Mishra", url: envvars.BASE_URL }],
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
        canonical: "/",
        languages: {
            "en": envvars.BASE_URL,
        },
    },

    verification: {
        google: "7BjQe7yKCUwNzGtw7BjtwYD-nca1Mofz8H5n_GW92Ik",
    },

    openGraph: {
        title: "Prabhat Mishra | Software Developer",
        description:
            "Software developer from India building fast, scalable web apps with TypeScript, React, Next.js, Node.js, Python & Go. Open to freelance and full-time opportunities.",
        url: `${envvars.BASE_URL}/`,
        siteName: "Prabhat Mishra — Software Developer",
        images: [
            {
                url: `${envvars.BASE_URL}/preview.webp`,
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
        images: [`${envvars.BASE_URL}/preview.webp`],
        creator: "@prabhatlabs",
        site: "@prabhatlabs",
    },

    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },

    other: {
        "profile:first_name": "Prabhat",
        "profile:last_name": "Mishra",
        "profile:username": "prabhatlabs",
        "profile:gender": "male",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const orgJsonLd = buildOrganizationJsonLd(
        "prabhatlabs",
        "Prabhat Mishra is a software developer from India specializing in TypeScript, React, Next.js, Node.js, Python, and Go. Available for freelance projects and full-time roles.",
        envvars.BASE_URL,
        `${envvars.BASE_URL}/logo.webp`,
        myInfo.contacts.map((c) => c.url),
    );

    return (
        <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
            <head>
                <link
                    rel="preconnect"
                    href="https://fonts.googleapis.com"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preconnect"
                    href="https://cdn.jsdelivr.net"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preconnect"
                    href="https://rum-core-worker.rumcore.workers.dev"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preconnect"
                    href="https://www.googletagmanager.com"
                    crossOrigin="anonymous"
                />
                <link
                    rel="dns-prefetch"
                    href="https://fonts.googleapis.com"
                />
                <link
                    rel="dns-prefetch"
                    href="https://cdn.jsdelivr.net"
                />
            </head>
            <body
                className={`antialiased no-scrollbar transition-all duration-500 ${dmsans.className} ${geist_mono.variable} ${GeistPixelSquare.variable}`}
            >
                <ThemeProvider attribute="class" defaultTheme="dark">
                    <JsonLd jsonLd={orgJsonLd} />
                    {children}
                </ThemeProvider>
                <Analytics />
                <SpeedInsights />
                <Script
                    src="https://cdn.jsdelivr.net/gh/prabhatlabs/rum-core-client-script@1.0.9/dist/rum-core.js"
                    data-worker="https://rum-core-worker.rumcore.workers.dev"
                    data-key="X74ymKYEqzFKWeVV7HxY7cqI"
                    strategy="lazyOnload"
                />
                <GoogleAnalytics gaId="G-6CD27EJQ0E" />
            </body>
        </html>
    );
}
