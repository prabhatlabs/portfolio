import { readFile, writeFile } from "fs/promises";
import path from "path/posix";
import { contactLinks, experiences, myInfo, projects, skills, tools } from "@/data/root";
import envvars from "@/lib/envvars";

function clean(str: string): string {
    return str.replace(/\*\*/g, "").replace(/\|\|/g, "").replace(/\\\\/g, "\n");
}

function flatten(desc: string): string {
    return clean(desc).replace(/\n/g, " ").replace(/\s+/g, " ").trim();
}

export async function generateLlmsFiles(): Promise<void> {
    const baseUrl = envvars.BASE_URL;
    const visibleProjects = projects.filter((p) => p.show);
    const visibleTools = tools.filter((t) => t.show);

    const groupedSkills: Record<string, string[]> = {};
    for (const s of Object.values(skills)) {
        (groupedSkills[s.type] ??= []).push(s.name);
    }

    let blogPosts: { slug: string; title: string; date: string; description: string; tags?: string[]; readingTime?: string }[] = [];
    try {
        const raw = await readFile(
            path.join(process.cwd(), "contents", "blogs", "registary.json"),
            "utf-8",
        );
        const registary = JSON.parse(raw);
        blogPosts = (registary.blogs || []).filter((b: any) => b.published !== false);
    } catch { }

    const contact = Object.fromEntries(
        Object.entries(contactLinks).map(([k, v]) => [k, v.url]),
    );

    const json = {
        name: myInfo.name,
        title: myInfo.title,
        url: baseUrl,
        imageUrl: `${baseUrl}${myInfo.imageUrl}`,
        description: flatten(myInfo.description),
        contact,
        techStack: groupedSkills,
        projects: visibleProjects.map((p) => ({
            name: p.title,
            description: flatten(p.description),
            url: p.links.find((l) => l.name === "Live")?.url || p.links[0]?.url || "",
            links: p.links.map((l) => ({ name: l.name, url: l.url })),
            skills: p.skills?.map((s) => s.name) || [],
        })),
        tools: visibleTools.map((t) => ({
            name: t.title,
            description: flatten(t.description),
            url: t.links[0]?.url || "",
            links: t.links.map((l) => ({ name: l.name, url: l.url })),
            skills: t.skills?.map((s) => s.name) || [],
        })),
        experience: experiences.map((e) => ({
            company: e.company,
            position: e.position,
            location: e.location,
            period: e.period,
            skills: (e.pills ?? e.skills ?? []).map((s: any) => s.name),
            highlights: (e.points || []).map((p) => clean(p)),
        })),
        blog: blogPosts.map((post) => ({
            title: post.title,
            description: post.description,
            url: `${baseUrl}/blog/${post.slug}`,
            date: post.date,
            tags: post.tags || [],
            readingTime: post.readingTime || undefined,
        })),
    };

    const txt: string[] = [];
    txt.push(`# ${myInfo.name} — ${myInfo.title}`);
    txt.push("");
    txt.push(`> ${flatten(myInfo.description)}`);
    txt.push("");
    txt.push("## Links");
    txt.push(`- [Homepage](${baseUrl})`);
    txt.push(`- [Blog](${baseUrl}/blog)`);
    txt.push(`- [GitHub](${contactLinks.github.url})`);
    txt.push(`- [LinkedIn](${contactLinks.linkedIn.url})`);
    txt.push(`- [X](${contactLinks.twitter.url})`);
    txt.push(`- [Email](mailto:prabhatm8000@gmail.com)`);
    txt.push(`- [Buy Me a Coffee](${contactLinks.buymeacoffee.url})`);
    txt.push(`- [Instagram](${contactLinks.instagram.url})`);
    txt.push("");

    txt.push("## Tech Stack");
    for (const [category, names] of Object.entries(groupedSkills)) {
        txt.push(`- **${category}**: ${names.join(", ")}`);
    }
    txt.push("");

    txt.push("## Projects");
    for (const p of visibleProjects) {
        const liveUrl = p.links.find((l) => l.name === "Live")?.url;
        txt.push(liveUrl ? `### [${p.title}](${liveUrl})` : `### ${p.title}`);
        txt.push("");
        txt.push(flatten(p.description));
        txt.push("");
        if (p.skills?.length) {
            txt.push(`**Stack:** ${p.skills.map((s) => s.name).join(", ")}`);
        }
        if (p.links?.length) {
            txt.push(`**Links:** ${p.links.map((l) => `[${l.name}](${l.url})`).join(" · ")}`);
        }
        txt.push("");
    }

    if (visibleTools.length) {
        txt.push("## Tools");
        for (const t of visibleTools) {
            const url = t.links[0]?.url || "";
            txt.push(url ? `### [${t.title}](${url})` : `### ${t.title}`);
            txt.push("");
            txt.push(flatten(t.description));
            txt.push("");
            if (t.skills?.length) {
                txt.push(`**Stack:** ${t.skills.map((s) => s.name).join(", ")}`);
            }
            if (t.links?.length) {
                txt.push(`**Links:** ${t.links.map((l) => `[${l.name}](${l.url})`).join(" · ")}`);
            }
            txt.push("");
        }
    }

    if (blogPosts.length) {
        txt.push("## Blog Posts");
        for (const post of blogPosts) {
            const date = new Date(post.date).toISOString().split("T")[0];
            const tags = post.tags?.length ? ` [${post.tags.join(", ")}]` : "";
            txt.push(`- [${post.title}](${baseUrl}/blog/${post.slug}) — ${date}${tags}`);
            txt.push(`  ${post.description}`);
        }
        txt.push("");
    }

    txt.push("## Experience");
    for (const e of experiences) {
        const loc = e.location ? ` — ${e.location}` : "";
        txt.push(`### ${e.position} @ ${e.company} (${e.period})${loc}`);
        txt.push("");
        const pills = (e.pills ?? e.skills ?? []) as { name: string }[];
        if (pills.length) {
            txt.push(`**Skills:** ${pills.map((s) => s.name).join(", ")}`);
        }
        if (e.points?.length) {
            txt.push("");
            txt.push("Highlights:");
            for (const point of e.points) {
                txt.push(`- ${clean(point)}`);
            }
        }
        txt.push("");
    }

    const publicDir = path.join(process.cwd(), "public");
    await writeFile(path.join(publicDir, "llms.json"), JSON.stringify(json, null, 2) + "\n", "utf-8");
    await writeFile(path.join(publicDir, "llms.txt"), txt.join("\n") + "\n", "utf-8");
}
