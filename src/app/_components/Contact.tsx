import { contactLinksArray } from "@/data/pages";
import Link from "next/link";

export default function Contact() {
    return (
        <section className="border-b flex justify-center flex-col gap-8">
            <div className="flex flex-col sm:flex-row items-center justify-between">
                {contactLinksArray.map((item, index) => (
                    <Link
                        key={item.name}
                        href={item.url}
                        target={item.target}
                        children={item.name}
                        data-isNotLast={index !== contactLinksArray.length - 1}
                        className="p-8 w-full text-center data-[isNotLast=true]:border-b data-[isNotLast=true]:sm:border-b-0 data-[isNotLast=true]:border-r-0 data-[isNotLast=true]:sm:border-r hover:bg-secondary"
                    />
                ))}
            </div>
        </section>
    );
}
