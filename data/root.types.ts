import type { IconType } from "react-icons";

export type LinkItem = {
    name: string;
    url: string;
    icon?: IconType;
    target: "_blank" | "_self";
};

export type PillItem = {
    name: string;
    icon: IconType;
};

export type ContentContent = {
    iconUrl?: string;
    title: string;
    imageUrl?: string;
    content: string | string[];
    links?: LinkItem[];
    pills?: PillItem[];
};

export type PageContent = {
    title: string;
    subtitle?: string;
    description?: string;
    content?: string | string[] | ContentContent[];
    icon?: IconType;
    iconUrl?: string;
    links?: LinkItem[];
    bottomLinks?: LinkItem[];
    imageUrl?: string;
    videoUrl?: string;
    pills?: PillItem[];
};
