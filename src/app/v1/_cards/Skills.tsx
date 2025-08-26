import { skillsData } from "@/data/data";
import { IoHardwareChipOutline } from "react-icons/io5";
import { Button } from "../../../components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card";

const Skills = () => {
    return (
        <Card>
            <CardHeader className="flex flex-col">
                <div className="flex gap-6 w-full">
                    <CardTitle className="text-2xl w-full flex justify-start items-center gap-2">
                        <IoHardwareChipOutline />
                        <span>{skillsData.title}</span>
                    </CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2 mb-2">
                {skillsData.skills.map((skill, i) => (
                    <Button size={"sm"} key={i} variant={"glitch"}>
                        {skill.icon}
                        <span>{skill.name}</span>
                    </Button>
                ))}
            </CardContent>
        </Card>
    );
};

export default Skills;
