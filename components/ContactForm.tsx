"use client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChangeEvent, FormEvent, useState } from "react";
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
    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");
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
                return "Send";
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center justify-center gap-2 p-2"
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
                className="min-h-26 h-26 sm:h-30 md:h-36.5"
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
                className="rounded-none h-9 w-full relative shadow-[2px_2px_0px_0px_var(--border)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px] transition-all duration-100"
            >
                {getButtonText()}
            </Button>
        </form>
    );
}
