import type { LinkItem } from "./page.types";

export type TabNames = 'overview' | 'skills' | 'experience' | 'projects' | 'blogs'

export type NavData = {
    title: string;
    navItems: LinkItem[];
}
