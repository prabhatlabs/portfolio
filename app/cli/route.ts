import {
    cleanDescription,
    experiences,
    groupedSkills,
    myInfo,
    theme,
    visibleProjects,
} from "./lib";

function render(): string {
    const out: string[] = [];

    out.push(`${theme.primary(theme.bold("  TERMINAL PORTFOLIO"))}`);
    out.push(`${theme.bold(`  ${myInfo.name}`)}`);
    out.push(`${theme.muted(`  ${myInfo.title}`)}`);
    out.push("");

    out.push(`${theme.secondary("  About")}`);
    for (const line of cleanDescription(myInfo.description).split("\n")) {
        if (!line.trim()) {
            out.push("");
            continue;
        }
        for (const part of line.trim().match(/.{1,76}(?:\s|$)/g) || [
            line.trim(),
        ]) {
            out.push(`  ${part.trim()}`);
        }
    }
    out.push("");

    out.push(`${theme.secondary("  Skills")}`);
    for (const [type, items] of Object.entries(groupedSkills)) {
        const names = items.map((s) => `${theme.bold(s.name)}`).join(" ");
        out.push(`  ${theme.accent(type.padEnd(12))}${names}`);
    }
    out.push("");

    out.push(`${theme.secondary("  Projects")}`);
    for (const [i, p] of visibleProjects.entries()) {
        out.push(`  ${theme.primary(`${i + 1}.`)} ${theme.bold(p.title)}`);
        for (const part of p.description
            .replace(/\n/g, " ")
            .match(/.{1,74}(?:\s|$)/g) || [p.description]) {
            out.push(`    ${part.trim()}`);
        }
        if (p.skills?.length) {
            const stack = p.skills
                .map((s) => `${theme.accent(s.name)}`)
                .join(" ");
            out.push(`  ${theme.muted("Stack:")} ${stack}`);
        }
        if (p.links?.length) {
            const links = p.links
                .map((l) => `${theme.link(l.name)}: ${l.url}`)
                .join("  ");
            out.push(`  ${theme.muted("Links:")} ${links}`);
        }
        out.push("");
    }

    out.push(`${theme.secondary("  Experience")}`);
    for (const e of experiences) {
        const pills = e.pills ?? e.skills;
        out.push(
            `  ${theme.bold(e.company.padEnd(26))}${theme.muted(e.period ?? "")}`,
        );
        out.push(
            `  ${theme.highlight(e.position.padEnd(24))}${theme.muted(e.location ?? "")}`,
        );
        if (pills?.length) {
            const names = (pills as { name: string }[])
                .map((s) => `${theme.muted(s.name)}`)
                .join(" ");
            out.push(`  ${names}`);
        }
        out.push("");
    }

    out.push(`${theme.secondary("  Contact")}`);
    for (const link of myInfo.contacts)
        out.push(`  ${theme.primary(link.name.padEnd(14))} ${link.url}`);
    out.push("");

    out.push(`${theme.muted("curl terminal.prabhatlabs.dev")}`);
    out.push("");

    return out.join("\n");
}

export async function GET() {
    return new Response(render(), {
        headers: { "Content-Type": "text/plain" },
    });
}
