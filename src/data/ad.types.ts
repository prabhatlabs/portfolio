import type { IconType } from "react-icons"
import type { LinkItem } from "./page.types"

export type AdContent = {
    icon?: IconType,
    title: string,
    description?: string,
    links: LinkItem[],
    imageUrl?: string
}