import { myInfoData } from "@/data/data";
import Image from "next/image";
import GlitchText from "../../../components/GlitchText";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card";

const MyInfo = () => {
    return (
        <Card>
            <CardHeader className="flex flex-col mb-4">
                <div className="flex gap-6 w-full">
                    <CardTitle className="w-full">
                        <GlitchText
                            className="text-2xl"
                            text={myInfoData.title}
                        />
                    </CardTitle>
                    <Image
                        className="rounded-full object-cover size-20"
                        src={myInfoData.pfp}
                        alt={myInfoData.name}
                        width={80}
                        height={80}
                    />
                </div>
                <CardDescription className="text-foreground/80">
                    {myInfoData.description}
                </CardDescription>
            </CardHeader>
        </Card>
    );
};

export default MyInfo;
