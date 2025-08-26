import TextHighlighting from "@/components/TextHighlighting";
import { workexpData } from "@/data/data";
import Image from "next/image";
import { Fragment } from "react";

const WorkExpSection = () => {
    return (
        <div
            id="workexp"
            className="relative w-full h-full flex flex-col gap-8 items-center justify-center overflow-hidden p-4 py-20"
        >
            <h3 className="text-3xl md:text-5xl">{workexpData.title}</h3>
            <div className="flex flex-col items-center justify-center w-full max-w-3xl gap-2 rounded-lg border border-dashed border-destructive py-4">
                {workexpData.workexp.map((exp, i) => (
                    <Fragment key={i}>
                        <div
                            key={i}
                            data-last={i === workexpData.workexp.length - 1}
                            className="flex flex-col w-full gap-2 px-4"
                        >
                            <div className="flex gap-2 w-full items-start">
                                <div className="rounded-full bg-white p-1">
                                    <Image
                                        width={30}
                                        height={30}
                                        src={exp.logo}
                                        alt={exp.company}
                                        className="rounded-full"
                                    />
                                </div>
                                <div className="flex flex-col w-full">
                                    <h5 className="text-lg font-semibold">
                                        {exp.company}
                                    </h5>
                                    <div className="flex flex-col md:flex-row gap-2">
                                        <h6 className="text-sm w-full">
                                            {exp.title}
                                        </h6>
                                        <p className=" w-full text-right text-sm">
                                            {exp.start} - {exp.end}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                {exp.description.map((desc, i) => (
                                    <div key={i} className="flex flex-col">
                                        <h6>{desc.projectName}</h6>
                                        <ul className="list-disc pl-5">
                                            {desc.description.map(
                                                (point, i) => (
                                                    <li key={i}>
                                                        <TextHighlighting
                                                            text={point}
                                                            textClassName="text-sm text-foreground/70"
                                                            highlightedTextClassName="text-lg"
                                                            specialTextClassName="text-foreground text-lg italic"
                                                        />
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                        {i !== workexpData.workexp.length - 1 && (
                            <span
                                key={`${i}_border`}
                                className="w-full h-px border-b border-dashed border-destructive"
                            />
                        )}
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default WorkExpSection;
