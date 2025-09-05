"use client";
import { contactsData, myInfoData } from "@/data/data";
import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const UnderScoreBlink = ({ show }: { show?: boolean }) => {
    return (
        <motion.span
            initial={{
                width: "0px",
            }}
            animate={{
                width: show ? "24px" : "0px",
            }}
            transition={{
                duration: 0.2,
                ease: "easeInOut",
            }}
            className="animate-caret-blink bg-white h-[2px] w-6"
        />
    );
};

const Footer = () => {
    const [emailHover, setEmailHover] = useState(false);
    return (
        <div className="min-h-[300px] h-full relative z-10 mt-16 pt-6 text-white">
            <div className="px-4 max-w-7xl mx-auto">
                <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light">
                    {"want to collaborate? Let's connect!"}
                </h4>
                <h2
                    className="mt-2 text-xl sm:text-2xl md:text-3xl lg:text-5xl w-fit flex items-end"
                    onMouseEnter={() => setEmailHover(true)}
                    onMouseLeave={() => setEmailHover(false)}
                >
                    <UnderScoreBlink show={emailHover} />
                    <a href={`mailto:${contactsData.mail}`}>
                        {contactsData.mail}
                    </a>
                </h2>
                <div className="mt-4 flex gap-4 sm:gap-6 sm:text-lg">
                    {contactsData.links.map((contact, i) => (
                        <a
                            key={i}
                            href={contact.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-light hover:underline"
                        >
                            {contact.name}
                        </a>
                    ))}
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 w-full border-t border-white/20 p-4">
                <div className="max-w-7xl w-full mx-auto text-end">
                    <span>
                        {myInfoData.name} © {new Date().getFullYear()}
                    </span>
                </div>
            </div>
            <Image
                alt={myInfoData.name}
                width={2000}
                height={400}
                src={"/v3/footer.jpg"}
                className="absolute top-0 left-0 -z-10 h-[300px] w-full object-cover object-left-top aspect-auto"
            />
            <div className="bg-black/20 absolute top-0 left-0 -z-10 h-[300px] w-full" />
        </div>
    );
};

export default Footer;
