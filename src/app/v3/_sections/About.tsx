import { myInfoData } from "@/data/data";
import Image from "next/image";

const About = () => {
    return (
        <div id="about" className="pt-16 pb-2">
            <h5 className="text-sm font-light">About me</h5>
            <div className="mt-2 flex flex-col md:flex-row gap-4 h-fit w-full">
                <div className="text-lg lg:text-xl leading-5 lg:leading-6 flex flex-col gap-2 w-full max-w-4xl">
                    {myInfoData.details.map((detail, i) => (
                        <p key={i}>{detail}</p>
                    ))}
                </div>

                <div className="h-[150px] w-full md:hidden rounded-md border border-border">
                    <Image
                        src={"/v3/about.jpg"}
                        alt={myInfoData.name}
                        width={500}
                        height={500}
                        className="object-cover w-full h-full rounded-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default About;
