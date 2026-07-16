import Corners from "@/components/Corners";
import { tools } from "@/data/root";
import { getIcon } from "@/lib/icon";
import { GeistPixelSquare } from "geist/font/pixel";
import Link from "next/link";

function ToolCard({ tool, idx }: { tool: (typeof tools)[0]; idx: number }) {
    return (
        <div
            key={tool.title}
            // use this items more than 3! currently only 1!
            // className={`${idx === 0 || idx === tools.length - 1 ? "" : "border-l"} z-10 p-2 md:p-3 flex flex-col gap-2 justify-between min-w-75`}
            className={`border-r z-10 p-2 md:p-3 flex flex-col gap-2 justify-between max-w-75`}
        >
            <div className="space-y-2">
                <h3 className="font-semibold">{tool.title}</h3>
                <p className="text-sm text-muted-foreground">
                    {tool.description}
                </p>
            </div>

            <div className="space-y-2">
                {tool.skills && (
                    <div className="flex gap-2 items-center">
                        {tool.skills.map((skill) => {
                            const IconComp = getIcon(skill.iconName);
                            return (
                                <IconComp key={skill.name} title={skill.name} />
                            );
                        })}
                    </div>
                )}

                <div className="flex gap-px items-center">
                    {tool.links.map((link, idx) => {
                        const IconComp = getIcon(link.iconName);
                        return (
                            <Link
                                key={link.name}
                                href={link.url}
                                target={link.target}
                                className="border group text-sm bg-foreground/10 px-1.5 py-0.5 flex items-center gap-2 justify-center"
                            >
                                <IconComp
                                    className={`size-4 ${idx === 0 ? "group-hover:-translate-y-1/4 group-hover:translate-x-1/4" : "group-hover:scale-125 group-hover:text-emerald-600"} transition-all duration-300`}
                                />
                                {link.name}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export function Tools() {
    return (
        <div className="relative">
            <Corners />
            <h2
                className={`p-4 sm:p-6 mt-16 sm:mt-20 md:mt-24 border-y text-3xl md:text-5xl ${GeistPixelSquare.className}`}
            >
                <span>Too</span>
                <span className="text-muted-foreground">ls</span>
            </h2>
            <div className="relative w-full p-4 border-b overflow-hidden">
                <div className="flex w-full overflow-auto border">
                    <span className="absolute -top-1 left-0 my-1 mx-4 font-mono text-[10px] text-muted-foreground/50">
                        flex w-full overflow-auto
                    </span>
                    {tools.map((tool, index) => {
                        return tool?.show ? (
                            <ToolCard tool={tool} idx={index} key={index} />
                        ) : null;
                    })}
                </div>
            </div>
        </div>
    );
}
