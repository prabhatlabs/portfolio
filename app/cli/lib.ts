export type ColorFn = (s: string) => string;
const esc = (code: string): ColorFn => (s: string) => `${code}${s}\x1b[0m`;

export type Theme = {
  primary: ColorFn;
  secondary: ColorFn;
  accent: ColorFn;
  muted: ColorFn;
  link: ColorFn;
  highlight: ColorFn;
  bold: ColorFn;
};

const defaultTheme: Theme = {
  primary: esc('\x1b[32m'),
  secondary: esc('\x1b[36m'),
  accent: esc('\x1b[33m'),
  muted: esc('\x1b[2m'),
  link: esc('\x1b[34m'),
  highlight: esc('\x1b[35m'),
  bold: esc('\x1b[1m'),
};

const altTheme: Theme = {
  primary: esc('\x1b[36m'),
  secondary: esc('\x1b[35m'),
  accent: esc('\x1b[33m'),
  muted: esc('\x1b[2m'),
  link: esc('\x1b[34m'),
  highlight: esc('\x1b[32m'),
  bold: esc('\x1b[1m'),
};

export const theme: Theme = process.env.THEME === 'alt' ? altTheme : defaultTheme;

import {
  myInfo,
  projects,
  experiences,
  skills,
} from '../../data/pages';

export { myInfo, experiences };

export const visibleProjects = projects.filter(p => p.show).slice(0, 2);

export const groupedSkills: Record<string, { type: string; name: string }[]> = {};
for (const skill of Object.values(skills)) {
  (groupedSkills[skill.type] ??= []).push(skill);
}

export function cleanDescription(desc: string): string {
  return desc.replace(/\*\*/g, '').replace(/\|\|/g, '').replace(/\\\\/g, '\n');
}
