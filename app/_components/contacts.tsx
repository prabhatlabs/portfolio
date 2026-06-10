import { ContactForm } from "@/components/ContactForm";

export async function Contacts() {
    return (
        <div>
            <h2 className="p-6 mt-16 sm:mt-20 md:mt-24 border-y text-3xl md:text-5xl font-bold">
                <span>
                    Contact
                </span>
                <span
                    className="text-muted-foreground ml-2"
                >
                    Form
                </span>
            </h2>
            <ContactForm />
        </div>
    );
}
