import { contactLinksArray } from "@/data/pages";
import Link from "next/link";
import { getIcon } from "@/lib/icons";

export default function Contact() {
    return (
        <section className="flex justify-center flex-col gap-8">
            <div className="flex flex-col sm:flex-row items-center justify-between">
                {contactLinksArray.map((item, index) => {
                    const IconComponent = getIcon(item.iconName);
                    return (
                        <Link
                            key={item.name}
                            href={item.url}
                            target={item.target}
                            className={`p-8 w-full text-center flex flex-col items-center gap-2 ${
                                index !== contactLinksArray.length - 1
                                    ? "border-b sm:border-b-0 border-r-0 sm:border-r"
                                    : ""
                            } hover:bg-secondary`}
                        >
                            <IconComponent className="size-6" />
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}
