import JsonLd from "@/components/JsonLd";
import {
    buildBreadcrumbListJsonLd,
    buildWebPageJsonLd,
} from "@/lib/json-ld";
import { cities, lastUpdated } from "@/data/locations";
import { visibleProjects } from "@/data/projects";
import envvars from "@/lib/envvars";
import { GeistPixelSquare } from "geist/font/pixel";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BorderLayoutForStaticPages from "@/components/BorderLayoutForStaticPages";

interface Props {
    params: Promise<{ city: string }>;
}

export function generateStaticParams() {
    return cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { city: slug } = await params;
    const city = cities.find((c) => c.slug === slug);
    if (!city) return { title: "Location Not Found" };

    return {
        title: `Software Developer in ${city.name}, ${city.state}`,
        description: `Software developer from Chhattisgarh, India with experience building products for teams in ${city.name}, ${city.state} and remotely across the country.`,
        openGraph: {
            title: `Software Developer in ${city.name} — Prabhat Mishra`,
            description: `Software developer with experience building products for teams in ${city.name}, ${city.state}. I work with TypeScript, React, Next.js, Node.js, Python & Go.`,
        },
        alternates: {
            canonical: `${envvars.BASE_URL}/locations/${city.slug}`,
        },
    };
}

export default async function CityPage({ params }: Props) {
    const { city: slug } = await params;
    const city = cities.find((c) => c.slug === slug);
    if (!city) notFound();

    const breadcrumbLd = buildBreadcrumbListJsonLd([
        { name: "Home", url: envvars.BASE_URL },
        { name: "Locations", url: `${envvars.BASE_URL}/locations` },
        {
            name: `${city.name}, ${city.state}`,
            url: `${envvars.BASE_URL}/locations/${city.slug}`,
        },
    ]);

    const webPageLd = buildWebPageJsonLd(
        `Software Developer in ${city.name}, ${city.state}`,
        `Software developer from Chhattisgarh with remote experience in ${city.name} and ${city.region}.`,
        `${envvars.BASE_URL}/locations/${city.slug}`,
        "Software Development",
    );

    return (
        <>
            <JsonLd jsonLd={webPageLd} />
            <JsonLd jsonLd={breadcrumbLd} />
            <BorderLayoutForStaticPages
                title={`${city.name}, ${city.state}`}
                desc="Software developer from Chhattisgarh, working remotely."
                lastUpdated={lastUpdated}
            >
                <div className="pt-4">
                    <div className="border-t px-4 md:px-6 py-4">
                        <h2
                            className={`text-lg sm:text-xl ${GeistPixelSquare.className}`}
                        >
                            About
                        </h2>
                        <p className="text-muted-foreground text-sm mt-1">
                            I&apos;m a full stack software developer from{" "}
                            <strong>Chhattisgarh, India</strong>. I build
                            scalable SaaS products, open source tools, and web
                            applications — working remotely with teams anywhere.
                        </p>
                    </div>

                    <div className="border-t px-4 md:px-6 py-4">
                        <h2
                            className={`text-lg sm:text-xl ${GeistPixelSquare.className}`}
                        >
                            Tech Stack
                        </h2>
                        <p className="text-muted-foreground text-sm mt-1">
                            TypeScript, React, Next.js, Node.js, Express,
                            Python, Go, PostgreSQL, MongoDB, Redis, Prisma,
                            Docker, Cloudflare, Tailwind CSS — end-to-end
                            full stack development for modern web applications.
                        </p>
                    </div>

                    <div className="border-t p-4 md:p-6">
                        <h2
                            className={`text-lg sm:text-xl ${GeistPixelSquare.className}`}
                        >
                            Projects
                        </h2>
                        <div className="mt-2 space-y-2">
                            {visibleProjects.map((p) => (
                                <Link
                                    key={p.title}
                                    href="/projects"
                                    className="block border px-3 py-2 hover:bg-foreground/5 transition-colors"
                                >
                                    <span className="text-sm font-medium">
                                        {p.title}
                                    </span>
                                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                                        {p.description}
                                    </p>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="border-t px-4 md:px-6 py-4">
                        <h2
                            className={`text-lg sm:text-xl ${GeistPixelSquare.className}`}
                        >
                            Open Source & Blog
                        </h2>
                        <p className="text-muted-foreground text-sm mt-1">
                            I maintain{" "}
                            <Link
                                href="/projects"
                                className="text-primary hover:underline"
                            >
                                Go Tunnel
                            </Link>
                            , contribute to the TypeScript ecosystem, and write
                            about software engineering on my{" "}
                            <Link
                                href="/blog"
                                className="text-primary hover:underline"
                            >
                                blog
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </BorderLayoutForStaticPages>
        </>
    );
}
