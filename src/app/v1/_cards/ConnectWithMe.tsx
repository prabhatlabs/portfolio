import { contactsData } from "@/data/data";
import { VscDebugDisconnect } from "react-icons/vsc";
import { Button } from "../../../components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../../../components/ui/card";

const ConnectWithMe = () => {
    return (
        <Card>
            <CardHeader className="flex flex-col">
                <CardTitle className="text-2xl w-full flex justify-start items-center gap-2">
                    <VscDebugDisconnect />
                    <span>{contactsData.title}</span>
                </CardTitle>
                <CardDescription className="text-foreground/80">
                    {contactsData.description}
                </CardDescription>
            </CardHeader>
            <CardContent className="mb-2">
                <div className="flex gap-2">
                    {contactsData.links.map((contact, i) => (
                        <a
                            key={i}
                            href={contact.url}
                            title={contact.name}
                            target="_blank"
                            className=""
                        >
                            <Button variant={"glitch"}>{contact.icon}</Button>
                        </a>
                    ))}
                </div>
                <a
                    className="hover:underline text-sm"
                    href={`mailto:${contactsData.mail}`}
                >
                    {contactsData.mail}
                </a>
            </CardContent>
        </Card>
    );
};

export default ConnectWithMe;
