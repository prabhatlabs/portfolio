"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, SubmitEvent, useState } from "react";
import { Button } from "./ui/button";

type ContactFormType = {
    name: string;
    email: string;
    subject: string;
    body: string;
};

const contactFormInit: ContactFormType = {
    name: "",
    email: "",
    subject: "",
    body: "",
};

export function ContactForm() {
    const [formData, setFormData] = useState<ContactFormType>(contactFormInit);

    function handleInputChange(
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
        const { name, value } = e.target;
        if (name in contactFormInit) {
            setFormData((p) => ({ ...p, [name]: value }));
        }
    }

    function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setFormData(contactFormInit);
    }

    return (
        <div className="relative w-full border-b grid sm:grid-cols-2">
            <div className="hidden sm:flex flex-col justify-center p-4 h-70 overflow-hidden">
                {Array(18)
                    .fill(0)
                    .map((_, i) => (
                        <span
                            key={i}
                            className="font-mono text-[10px] text-muted-foreground"
                        >
                            border-b grid sm:grid-cols-2
                        </span>
                    ))}
            </div>
            <form
                onSubmit={handleSubmit}
                className="sm:border-l w-full flex flex-col items-center justify-center gap-2 p-2"
            >
                <Input
                    placeholder="Name"
                    name="name"
                    value={formData["name"]}
                    onChange={handleInputChange}
                />
                <Input
                    placeholder="Email"
                    name="email"
                    value={formData["email"]}
                    onChange={handleInputChange}
                />
                <Input
                    placeholder="Subject"
                    name="subject"
                    value={formData["subject"]}
                    onChange={handleInputChange}
                />
                <Textarea
                    placeholder="Body"
                    name="body"
                    value={formData["body"]}
                    onChange={handleInputChange}
                />
                <Button
                    type="submit"
                    variant={"outline"}
                    className="rounded-none h-7 w-full relative"
                >
                    <div className="animate-line-shadow absolute w-full h-full bg-[repeating-linear-gradient(315deg,var(--border)_0,var(--border)_2px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed"></div>
                    Submit
                </Button>
            </form>
        </div>
    );
}
