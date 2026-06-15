import {
  myInfo,
  experiences,
  projects,
  skills,
} from '../../../data/pages';

const visibleProjects = projects.filter(p => p.show).slice(0, 2);

const groupedSkills: Record<string, { type: string; name: string }[]> = {};
for (const skill of Object.values(skills)) {
  (groupedSkills[skill.type] ??= []).push(skill);
}

function cleanDescription(desc: string): string {
  return desc.replace(/\*\*/g, '').replace(/\|\|/g, '').replace(/\\\\/g, '\n');
}

function render(): string {
  const out: string[] = [];
  out.push('#!/usr/bin/env bash');
  out.push('set -e');
  out.push('BOLD=$(tput bold)');
  out.push('DIM=$(tput dim)');
  out.push('GREEN=$(tput setaf 2)');
  out.push('CYAN=$(tput setaf 6)');
  out.push('YELLOW=$(tput setaf 3)');
  out.push('MAGENTA=$(tput setaf 5)');
  out.push('BLUE=$(tput setaf 4)');
  out.push('RESET=$(tput sgr0)');
  out.push('');
  out.push('clear');
  out.push(`echo "\${GREEN}\${BOLD}  TERMINAL PORTFOLIO\${RESET}"`);
  out.push(`echo "\${BOLD}  ${myInfo.name}\${RESET}"`);
  out.push(`echo "\${DIM}  ${myInfo.title}\${RESET}"`);
  out.push('echo ""');
  out.push('echo "${CYAN}  About${RESET}"');

  for (const line of cleanDescription(myInfo.description).split('\n')) {
    if (!line.trim()) { out.push('echo ""'); continue; }
    for (const p of line.trim().match(/.{1,76}(?:\s|$)/g) || [line.trim()]) {
      out.push(`echo "  ${p.trim()}"`);
    }
  }
  out.push('echo ""');
  out.push('echo "${CYAN}  Skills${RESET}"');
  for (const [type, items] of Object.entries(groupedSkills)) {
    const names = items.map(s => `\${BOLD}${s.name}\${RESET}`).join(' ');
    out.push(`echo "  \${YELLOW}${type.padEnd(12)}\${RESET}${names}"`);
  }
  out.push('echo ""');
  out.push('echo "${CYAN}  Projects${RESET}"');
  for (const [i, p] of visibleProjects.entries()) {
    out.push(`echo "  \${GREEN}${i + 1}.\${RESET} \${BOLD}${p.title}\${RESET}"`);
    for (const part of (p.description.replace(/\n/g, ' ').match(/.{1,74}(?:\s|$)/g) || [p.description])) {
      out.push(`echo "    ${part.trim()}"`);
    }
    if (p.skills?.length) {
      const stack = p.skills.map(s => `\${YELLOW}${s.name}\${RESET}`).join(' ');
      out.push(`echo "  \${DIM}Stack:\${RESET} ${stack}"`);
    }
    if (p.links?.length) {
      const links = p.links.map(l => `\${BLUE}${l.name}\${RESET}: ${l.url}`).join('  ');
      out.push(`echo "  \${DIM}Links:\${RESET} ${links}"`);
    }
    out.push('echo ""');
  }
  out.push('echo "${CYAN}  Experience${RESET}"');
  for (const e of experiences) {
    const pills = e.pills ?? e.skills;
    out.push(`echo "  \${BOLD}${e.company.padEnd(26)}\${RESET}\${DIM}${e.period ?? ''}\${RESET}"`);
    out.push(`echo "  \${MAGENTA}${e.position.padEnd(24)}\${RESET}\${DIM}${e.location ?? ''}\${RESET}"`);
    if (pills?.length) {
      const names = (pills as { name: string }[]).map(s => `\${DIM}${s.name}\${RESET}`).join(' ');
      out.push(`echo "  ${names}"`);
    }
    out.push('echo ""');
  }
  out.push('echo "${CYAN}  Contact${RESET}"');
  for (const link of myInfo.contacts) out.push(`echo "  \${GREEN}${link.name.padEnd(14)}\${RESET} ${link.url}"`);
  out.push('echo ""');
  out.push('echo "${DIM}curl terminal.prabhatlabs.dev${RESET}"');
  return out.join('\n');
}

export async function GET() {
  return new Response(render(), {
    headers: { 'Content-Type': 'text/plain' },
  });
}
