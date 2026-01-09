import { contactLinksArray } from "@/data/pages";
import Link from "next/link";

export default function Contact() {
    return (
        <section className="flex justify-center flex-col gap-8">
            <div className="flex flex-col sm:flex-row items-center justify-between">
                {contactLinksArray.map((item, index) => (
                    <Link
                        key={item.name}
                        href={item.url}
                        target={item.target}
                        className={`p-8 w-full text-center ${
                            index !== contactLinksArray.length - 1
                                ? "border-b sm:border-b-0 border-r-0 sm:border-r"
                                : ""
                        } hover:bg-secondary`}
                    >
                        {item.name}
                    </Link>
                ))}
            </div>
        </section>
    );
}
