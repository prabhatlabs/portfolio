import type { NavData } from "./nav.types";
import { pages } from "./pages";

export const navData: NavData = {
    title: "prabhatlabs.dev",
    navItems: pages.map((page) => ({
        name: page.name,
        url: `/${page.tabName}`,
        target: "_self",
    })),
}