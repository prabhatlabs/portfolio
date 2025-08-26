import { workexpData } from "@/data/data";
import Image from "next/image";
import { MdWorkOutline } from "react-icons/md";
import TextHighlighting from "../../../components/TextHighlighting";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card";

const WorkExp = () => {
    return (
        <Card className="w-full">
            <CardHeader className="flex flex-col">
                <div className="flex gap-6 w-full">
                    <CardTitle className="text-2xl w-full flex justify-start items-center gap-2">
                        <MdWorkOutline />
                        <span>{workexpData.title}</span>
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="mb-2">
                {workexpData.workexp.map((exp, i) => (
                    <div className="flex flex-col gap-2" key={i}>
                        <div className="flex gap-2 items-start">
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
                                <h6 className="text-sm">{exp.title}</h6>
                                <p className="w-full text-right text-xs">
                                    {exp.start} - {exp.end}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 py-1">
                            {exp.description.map((desc, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                    <h5 className="text-lg font-semibold w-full">
                                        {desc.projectName}
                                    </h5>
                                    <ul className="list-disc pl-5 text-sm">
                                        {desc.description.map((item, i) => (
                                            <li key={i}>
                                                <TextHighlighting
                                                    text={item}
                                                    className="text-foreground/80"
                                                    highlightedTextClassName="font-semibold text-foreground"
                                                    specialTextClassName="italic font-semibold text-foreground"
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {i !== workexpData.workexp.length - 1 && (
                            <div className="my-4 border-b border-muted-foreground/20" />
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default WorkExp;
