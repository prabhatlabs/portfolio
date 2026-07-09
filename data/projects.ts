import { projects } from "@/data/root";

export const visibleProjects = projects.filter((p) => p.show);
export const lastUpdated = "July 2026";
