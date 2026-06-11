import { ContactForm } from "@/components/ContactForm";
import { TetrisContacts } from "@/components/tetris";
import { myInfo } from "@/data/pages";
import { getIcon } from "@/lib/icon";
import { GeistPixelSquare } from "geist/font/pixel";
import Link from "next/link";

export async function Contacts() {
    const contactsCompArray = myInfo.contacts.map((contact, index) => {
        const Icon = getIcon(contact.iconName);
        return (
            <Link
                key={contact.name}
                href={contact.url}
                className={`p-1.5 text-foreground duration-300 group ${index !== 0 ? "border-l" : ""}`}
            >
                <Icon className="size-4 transition-transform group-hover:rotate-3 group-hover:-translate-y-1" />
            </Link>
        );
    });

    return (
        <div>
            <h2 className={`p-6 mt-16 sm:mt-20 md:mt-24 border-t text-3xl md:text-5xl ${GeistPixelSquare.className}`}>
                <span>Contact</span>
                <span className="text-muted-foreground ml-2">Form</span>
            </h2>
            <div className="relative w-full border-y">
                <div className="grid sm:grid-cols-2">
                    <div className="p-2 relative sm:border-r hidden sm:flex items-center justify-center w-full h-full">
                        {/*<div className="flex items-center justify-center border">
                            {contactsCompArray}
                        </div>*/}
                        <TetrisContacts />
                    </div>
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
