"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

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
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    function handleInputChange(
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) {
        const { name, value } = e.target;
        if (name in contactFormInit) {
            setFormData((p) => ({ ...p, [name]: value }));
        }
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (status === "loading") return;

        setStatus("loading");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            setStatus("success");
            setFormData(contactFormInit);
            setTimeout(() => setStatus("idle"), 5000);
        } catch (error: any) {
            setStatus("error");
            setMessage(error.message);
            setTimeout(() => {
                setStatus("idle");
                setMessage("");
            }, 5000);
        }
    }

    const getButtonText = () => {
        switch (status) {
            case "loading":
                return "Sending...";
            case "success":
                return "Sent Successfully!";
            case "error":
                return message || "Failed to send";
            default:
                return "Submit";
        }
    };

    return (
        <div className="relative w-full border-b grid sm:grid-cols-2">
            <div className="hidden sm:flex flex-col justify-center p-4 h-70 overflow-hidden mask-y-from-80%">
                <motion.div
                    animate={{ y: [0, -15] }}
                    transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >
                    {Array(25)
                        .fill(0)
                        .map((_, i) => (
                            <span
                                key={i}
                                className="font-mono text-[10px] text-muted-foreground block h-[15px]"
                            >
                                border-b grid sm:grid-cols-2
                            </span>
                        ))}
                </motion.div>
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
                    required
                />
                <Input
                    placeholder="Email"
                    name="email"
                    type="email"
                    value={formData["email"]}
                    onChange={handleInputChange}
                    required
                />
                <Input
                    placeholder="Subject"
                    name="subject"
                    value={formData["subject"]}
                    onChange={handleInputChange}
                    required
                />
                <Textarea
                    placeholder="Body"
                    name="body"
                    value={formData["body"]}
                    onChange={handleInputChange}
                    required
                />
                <Button
                    type="submit"
                    variant={"outline"}
                    disabled={status === "loading"}
                    className="rounded-none h-9 w-full relative"
                >
                    <div className="animate-line-shadow absolute w-full h-full bg-[repeating-linear-gradient(315deg,var(--border)_0,var(--border)_2px,transparent_0,transparent_50%)] bg-size-[10px_10px] bg-fixed"></div>
                    {getButtonText()}
                </Button>
            </form>
        </div>
    );
}
