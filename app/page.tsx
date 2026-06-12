import { About } from "./_components/about";
import { Blogs } from "./_components/blogs";
import { Contacts } from "./_components/contacts";
import { Contributions } from "./_components/contributions";
import { Experiance } from "./_components/experiance";
import { Topbar } from "./_components/topbar";
import { Projects } from "./_components/projects";
import { Skills } from "./_components/skills";
import { Footer } from "./_components/footer";
import Link from "next/link";
import { myInfo } from "@/data/pages";

export default function PageContent() {
    return (
        <div className="min-h-dvh h-full overflow-auto relative">
            <div className="h-6 md:h-20 w-full border-b">
                <div className="max-w-3xl mx-auto border-x h-full relative">
                </div>
            </div>

            {/* main content */}
            <div className="z-10 max-w-3xl mx-auto relative">
                <div className="-z-10 absolute top-0 left-0 w-4 h-full border-l"></div>
                <div className="">
                    <Topbar />
                    <About />
                    <Experiance />
                    <Projects />
                    <Contributions />
                    <Skills />
                    <Blogs />
                    <Contacts />
                    <Footer />
                </div>
                <div className="-z-10 absolute top-0 right-0 w-4 h-full border-r"></div>
            </div>

            <div className="h-fit md:h-20 w-full border-t">
                <div className="max-w-3xl mx-auto border-x h-full relative">
                    <div className="text-muted-foreground flex items-center justify-between text-xs py-1 px-2">
                        <p>prabhatlabs.dev &copy; 2026</p>
                        <div className="flex gap-2 items-center">
                            {myInfo.contacts.slice(0, 3).map((contact) => {
                                return (
                                    <Link
                                        key={contact.name}
                                        href={contact.url}
                                        className={`hover:underline transition-all duration-300`}
                                    >
                                        {contact.name}.com
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
