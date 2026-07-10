import BorderLayoutForStaticPages from "@/components/BorderLayoutForStaticPages";
import JsonLd from "@/components/JsonLd";
import { lastUpdated, visibleProjects } from "@/data/projects";
import envvars from "@/lib/envvars";
import { getIcon } from "@/lib/icon";
import { buildBreadcrumbListJsonLd, buildWebPageJsonLd } from "@/lib/json-ld";
import { GeistPixelSquare } from "geist/font/pixel";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Projects",
    description:
        "Full-stack SaaS projects built by Prabhat Mishra — rum-core RUM monitoring, Blade Tools, Mapware threat intelligence, Ref.com link management, and more.",
    openGraph: {
        title: "Projects — Prabhat Mishra",
        description:
            "SaaS projects built by Prabhat Mishra: rum-core, Blade Tools, Mapware, Ref.com, and Go Tunnel.",
    },
};

const breadcrumbLd = buildBreadcrumbListJsonLd([
    { name: "Home", url: envvars.BASE_URL },
    { name: "Projects", url: `${envvars.BASE_URL}/projects` },
]);

const webPageLd = buildWebPageJsonLd(
    "Projects — Prabhat Mishra",
    "Full-stack SaaS projects built by Prabhat Mishra.",
    `${envvars.BASE_URL}/projects`,
    "Software Projects",
);

export default function ProjectsPage() {
    return (
        <>
            <JsonLd jsonLd={webPageLd} />
            <JsonLd jsonLd={breadcrumbLd} />
            <BorderLayoutForStaticPages
                title="Projects"
                desc="SaaS products and tools I've built end-to-end."
                lastUpdated={lastUpdated}
            >
                <div className="relative">
                    <span className="text-muted-foreground/50 text-[10px] font-mono absolute top-0 left-4 mb-1">
                        p-4 flex gap-4 items-start
                    </span>
                    <div className="pt-4">
                        {visibleProjects.map((p) => (
                            <article
                                key={p.title}
                                className="border-t p-4 flex flex-col sm:flex-row gap-4 items-start"
                            >
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h2
                                            className={`text-lg sm:text-xl ${GeistPixelSquare.className}`}
                                        >
                                            {p.title}
                                        </h2>
                                    </div>
                                    <p className="text-muted-foreground text-sm mb-2">
                                        {p.description}
                                    </p>
                                    <div className="flex flex-wrap gap-1 mb-2">
                                        {p.skills?.map((s) => (
                                            <span
                                                key={s.name}
                                                className="text-xs bg-foreground/10 px-2 py-0.5 border"
                                            >
                                                {s.name}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-1">
                                        {p.links?.map((l) => {
                                            const Icon = getIcon(l.iconName);
                                            return (
                                                <Link
                                                    key={l.name}
                                                    href={l.url}
                                                    target={l.target}
                                                    className="border text-sm bg-foreground/10 px-2 py-0.5 flex items-center gap-1.5 hover:bg-foreground/20 transition-colors"
                                                >
                                                    <Icon className="size-4" />
                                                    {l.name}
                                                </Link>
                                            );
                                        })}
                                    </div>
                                </div>
                                {p.imageUrl && (
                                    <Image
                                        src={p.imageUrl}
                                        alt={p.title}
                                        width={180}
                                        height={96}
                                        className="w-full sm:w-50 aspect-video border shrink-0 object-cover"
                                    />
                                )}
                            </article>
                        ))}
                    </div>
                </div>
            </BorderLayoutForStaticPages>
        </>
    );
}
