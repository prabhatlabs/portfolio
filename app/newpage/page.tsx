import type { Metadata } from "next";
import Clock from "./_components/clock";
import Notes from "./_components/notes";

export const metadata: Metadata = {
    title: "New Page",
    description: "A clock and notes page.",
};

export default function NewPage() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center pt-24 pb-16 gap-12">
            <Clock />
            <Notes />
        </div>
    );
}
