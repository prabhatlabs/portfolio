import type { AdContent } from "./ad.types";
import { contactLinks } from "./pages";

export const ads: AdContent[] = [
    {
        title: "Hire Me!",
        description: "want a developer?",
        imageUrl: "/others/hireme.png",
        links: [contactLinks.mail, contactLinks.linkedIn],
    },
    {
        title: "View My Journey",
        description: "curious how my work has evolved over time?",
        links: [contactLinks.github, contactLinks.twitter],
    },
    // {
    //     title: "Let's Collaborate",
    //     description: "got an idea or project?",
    //     imageUrl: "/others/hireme.jpg",
    //     links: [contactLinks.linkedIn, contactLinks.mail],
    // },
];
