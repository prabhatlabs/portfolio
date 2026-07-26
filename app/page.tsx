import JsonLd from "@/components/JsonLd";
import { myInfo, projects, tools, skills } from "@/data/root";
import {
    personJsonLd,
    webSiteJsonLd,
    buildFAQJsonLd,
    buildItemListJsonLd,
    buildSoftwareApplicationJsonLd,
    buildBreadcrumbListJsonLd,
    buildWebPageJsonLd,
} from "@/lib/json-ld";
import envvars from "@/lib/envvars";
import Link from "next/link";
import { About } from "./_components/about";
import { Blogs } from "./_components/blogs";
import { Contributions } from "./_components/contributions";
import { Experiance } from "./_components/experiance";
import { Footer } from "./_components/footer";
import { Projects } from "./_components/projects";
import { Skills } from "./_components/skills";
import { Tools } from "./_components/tools";
import { Topbar } from "./_components/topbar";

const skillsValues = Object.values(skills);
const skillsLd = buildItemListJsonLd(
    skillsValues.map((s) => ({ name: s.name })),
    "Skills & Technologies",
);

const visibleProjects = projects.filter((p) => p.show);
const projectsLd = buildItemListJsonLd(
    visibleProjects.map((p) => ({
        name: p.title,
        description: p.description,
        url: p.links.find((l) => l.name === "Live")?.url,
        image: p.imageUrl ? `${envvars.BASE_URL}${p.imageUrl}` : undefined,
    })),
    "Projects by Prabhat Mishra",
);

const toolsApps = tools
    .filter((t) => t.show)
    .map((t) => ({
        name: t.title,
        description: t.description,
        url: t.links.find((l) => l.name === "GitHub")?.url,
        language: t.skills.map((s) => s.name),
        operatingSystem: "Cross-platform",
    }));
const toolsLd = buildSoftwareApplicationJsonLd(toolsApps);

const breadcrumbLd = buildBreadcrumbListJsonLd([
    { name: "Home", url: envvars.BASE_URL },
]);

const webPageLd = buildWebPageJsonLd(
    "Prabhat Mishra | Software Developer",
    "Portfolio of Prabhat Mishra, a full stack software developer from India.",
    envvars.BASE_URL,
    "Software Development",
);

const faqLd = buildFAQJsonLd([
    {
        question: "Who is Prabhat Mishra?",
        answer:
            "Prabhat Mishra is a self-taught full stack software developer from India specializing in TypeScript, React, Next.js, Node.js, Python, and Go. He builds privacy-first, scalable SaaS products and is available for freelance projects and full-time roles.",
    },
    {
        question: "What tech stack does Prabhat Mishra use?",
        answer:
            "Prabhat Mishra works with TypeScript, JavaScript, React, Next.js, Node.js, Express, Python, Go, PostgreSQL, MongoDB, Redis, Prisma, Docker, Cloudflare, and Tailwind CSS among other tools.",
    },
    {
        question: "How can I hire Prabhat Mishra?",
        answer:
            "Prabhat Mishra is open to freelance projects and full-time software development roles. You can reach out via email at prabhatm8000@gmail.com or connect on LinkedIn at linkedin.com/in/prabhatm8000.",
    },
    {
        question: "Is Prabhat Mishra available for remote work?",
        answer:
            "Yes, Prabhat Mishra is available for remote software development positions and freelance contracts worldwide.",
    },
    {
        question: "Does Prabhat Mishra have a computer science degree?",
        answer:
            "No, Prabhat Mishra is a self-taught software developer without a formal CS degree. He has built a strong portfolio through practical experience, internships, and freelance work.",
    },
    {
        question: "What projects has Prabhat Mishra built?",
        answer:
            "Prabhat Mishra has built rum-core (a Real User Monitoring SaaS), Blade Tools (privacy-first browser-based tool suite), Mapware (IP threat intelligence platform), Ref.com (link management SaaS), and Go Tunnel (self-hosted reverse port-forwarding CLI), among others.",
    },
]);

export default function PageContent() {
    return (
        <>
            <JsonLd jsonLd={personJsonLd} />
            <JsonLd jsonLd={webSiteJsonLd} />
            <JsonLd jsonLd={webPageLd} />
            <JsonLd jsonLd={faqLd} />
            <JsonLd jsonLd={breadcrumbLd} />
            <JsonLd jsonLd={skillsLd} />
            <JsonLd jsonLd={projectsLd} />
            <JsonLd jsonLd={toolsLd} />
            <div className="overflow-hidden lg:p-6 transition-all duration-300">
                <div className="lg:h-[calc(100dvh-48px)] h-dvh overflow-auto relative lg:border">
                    <div className="h-6 md:h-20 w-full border-b">
                        <div className="max-w-3xl mx-auto border-x h-full relative"></div>
                    </div>

                    {/* main content */}
                    <div className="z-10 max-w-3xl mx-auto relative">
                        {/*<div className="-z-10 absolute top-0 left-0 w-4 h-full border-l"></div>*/}
                        <div className="border-x">
                            <Topbar />
                            <About />
                            <Experiance />
                            <Projects />
                            <Tools />
                            <Contributions />
                            <Skills />
                            <Blogs />
                            <Footer />
                        </div>
                        {/*<div className="-z-10 absolute top-0 right-0 w-4 h-full border-r"></div>*/}
                    </div>

                    <div className="h-fit md:h-20 w-full border-t">
                        <div className="max-w-3xl mx-auto border-x h-full relative">
                            <div className="text-muted-foreground flex items-center justify-between text-xs py-1 px-2">
                                <p>prabhatlabs.dev &copy; 2026</p>
                                <div className="flex gap-2 items-center">
                                    {myInfo.contacts
                                        .slice(0, 3)
                                        .map((contact) => {
                                            return (
                                                <Link
                                                    key={contact.name}
                                                    href={contact.url}
                                                    className={`hover:underline transition-all duration-300`}
                                                >
                                                    {contact.name}.com
                                                </Link>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
