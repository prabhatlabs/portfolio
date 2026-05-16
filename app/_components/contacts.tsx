import { ContactForm } from "@/components/ContactForm";
import { LineShadowText } from "@/components/ui/line-shadow-text";

export async function Contacts() {
    return (
        <div>
            <h2 className="p-6 mt-16 sm:mt-20 md:mt-24 border-y text-3xl md:text-5xl font-bold">
                <LineShadowText shadowColor={"var(--foreground)"}>
                    Contact
                </LineShadowText>
                <LineShadowText
                    className="text-foreground/60 ml-2"
                    shadowColor={"var(--muted-foreground)"}
                >
                    Form
                </LineShadowText>
            </h2>
            <ContactForm />
        </div>
    );
}
