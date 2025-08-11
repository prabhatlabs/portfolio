import Image from "next/image";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";

const MyInfo = () => {
    return (
        <Card>
            <CardHeader className="flex flex-col mb-4">
                <div className="flex gap-6 w-full">
                    <CardTitle className="text-2xl w-full">
                        Hey there, <br /> I'm Prabhat Mishra
                    </CardTitle>
                    <Image
                        className="rounded-full object-cover size-20"
                        src={
                            "https://avatars.githubusercontent.com/u/138608570?v=4"
                        }
                        alt="Prabhat Mishra"
                        width={80}
                        height={80}
                    />
                </div>
                <CardDescription>
                    I build software the way some people build puzzles, piece by
                    piece, until everything clicks.
                </CardDescription>
            </CardHeader>
        </Card>
    );
};

export default MyInfo;
