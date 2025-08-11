import Image from "next/image";
import { MdWorkOutline } from "react-icons/md";
import TextHighlighting from "../TextHighlighting";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const workexp = [
    {
        logo: "/companyLogos/nxtechworks_logo.jpeg",
        title: "Full Stack Developer Intern (Remote)",
        company: "NxTechWorks",
        start: "Jan 2025",
        end: "Present",
        description: [
            {
                projectName: "HealthProNext",
                description: [
                    "**Dynamic visit form builder** for customizable patient forms.",
                    "**Multi-template functionality** to streamline clinical workflows.",
                    "**Visit comparison module** for side-by-side tracking & diagnosis accuracy.",
                    "**Calendar-based appointment view** for quick follow-ups & scheduling.",
                    "**Cross-device responsive front-end** for consistent UX.",
                    "Reduced redundant **API calls** by ||~40-45%|| via **reducer** and **dispatch** optimization.",
                ],
            },
            {
                projectName: "Primes360",
                description: [
                    "**Role-based authentication system** with permissions for all user tiers.",
                    "Modules for **inventory**, **asset**, **schedule**, and **task management** with automation.",
                    "**Centralized dashboard** combining resources, assets, and inventory.",
                    "Reduced **database calls** by ||~20-30%|| using **MongoDB aggregation pipeline**, Instead of calling multiple database functions.",
                    "**Enhanced UI responsiveness** with bug fixes & stability improvements.",
                ],
            },
        ],
    },
    {
        logo: "/companyLogos/teconicopvtltd_logo.jpeg",
        title: "Full Stack Developer Intern (Remote)",
        company: "TecoNico Pvt. Ltd.",
        start: "Jul 2024",
        end: "Dec 2024",
        description: [
            {
                projectName: "Robosensy",
                description: [
                    "Developed **API workflow** to auto-create **follow-up appointments** when submitting prescriptions with next visit details.",
                    "Built feature to generate **prescription PDFs** from doctor-submitted forms and **invoice PDFs** for reception workflows.",
                    "Integrated **WhatsApp bot** via **3rd-party provider** for sending notifications and prescriptions.",
                    "Created **backend API documentation**, reducing **development time** by ||~20%|| through parallel backend-frontend workflows.",
                    "Improved **backend efficiency** and reduced **database/API response times** by ||~20-30%|| via **aggregation pipeline optimization**, **indexing**, and **fixing unexpected lookup errors** that returned empty arrays.",
                ],
            },
        ],
    },
];

const WorkExp = () => {
    return (
        <Card className="w-full">
            <CardHeader className="flex flex-col">
                <div className="flex gap-6 w-full">
                    <CardTitle className="text-2xl w-full flex justify-start items-center gap-2">
                        <MdWorkOutline />
                        <span>Work Experience</span>
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="mb-2">
                {workexp.map((exp, i) => (
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
                                    <h5 className="text-lg font-semibold w-full border-b border-border">
                                        {desc.projectName}
                                    </h5>
                                    <ul className="list-disc pl-5 text-sm">
                                        {desc.description.map((item, i) => (
                                            <li key={i}>
                                                <TextHighlighting
                                                    text={item}
                                                    className="text-foreground/70"
                                                    highlightedTextClassName="font-semibold text-foreground"
                                                    specialTextClassName="italic font-semibold text-foreground"
                                                />
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {i !== workexp.length - 1 && (
                            <div className="my-4 border-b border-muted-foreground/20" />
                        )}
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};

export default WorkExp;
