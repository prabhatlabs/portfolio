import { FaLinkedinIn } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";
import { RiTwitterXFill } from "react-icons/ri";
import { VscDebugDisconnect } from "react-icons/vsc";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";

const contacts = [
    {
        name: "X",
        url: "https://x.com/prabhatsuntoh",
        icon: <RiTwitterXFill className="size-6" />,
    },
    {
        name: "GitHub",
        url: "https://github.com/prabhatm8000",
        icon: <IoLogoGithub className="size-6" />,
    },
    {
        name: "Linkedin",
        url: "https://linkedin.com/in/prabhatm8000",
        icon: <FaLinkedinIn className="size-6" />,
    },
];

const ConnectWithMe = () => {
    return (
        <Card>
            <CardHeader className="flex flex-col">
                <CardTitle className="text-2xl w-full flex justify-start items-center gap-2">
                    <VscDebugDisconnect />
                    <span>Connect with me</span>
                </CardTitle>
                <CardDescription className="text-foreground/70">
                    You can find me on the following platforms!
                </CardDescription>
            </CardHeader>
            <CardContent className="mb-2">
                <div className="flex gap-2">
                    {contacts.map((contact, i) => (
                        <a
                            key={i}
                            href={contact.url}
                            title={contact.name}
                            target="_blank"
                            className=""
                        >
                            {contact.icon}
                        </a>
                    ))}
                </div>
                <a
                    className="hover:underline text-sm"
                    href="mailto:prabhatm8000@gmail.com"
                >
                    prabhatm8000@gmail.com
                </a>
            </CardContent>
        </Card>
    );
};

export default ConnectWithMe;
