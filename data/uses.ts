import { skills } from "@/data/root";

export type UsesEntry = {
    category: string;
    items: { name: string; iconName: string }[];
};

const skillValues = Object.values(skills);

const grouped: Record<string, { name: string; iconName: string }[]> = {};
for (const s of skillValues) {
    (grouped[s.type] ??= []).push({ name: s.name, iconName: s.iconName });
}

export const usesEntries: UsesEntry[] = Object.entries(grouped).map(
    ([category, items]) => ({ category, items }),
);

export const lastUpdated = "2026-07-10";
