import type { IconType } from "react-icons";
import type { TabNames } from "./nav.types";

export type LinkItem = {
    name: string;
    url: string;
    icon?: IconType;
    target: '_blank' | '_self';
}

export type PillItem = {
    name: string;
    icon: IconType;
}

export type PageContent = {
    title: string;
    subtitle?: string;
    description?: string;
    content?: string | string[] | { title: string, content: string | string[] }[];
    icon?: IconType;
    iconUrl?: string;
    links?: LinkItem[];
    imageUrl?: string;
    videoUrl?: string;
    pills?: PillItem[];
}

export type PageData = {
    tabName: TabNames;      // lowercase
    name: string;           // one word
    title: string;          // full title
    description: string;
    imageUrl?: string;
    contents: PageContent[]
}