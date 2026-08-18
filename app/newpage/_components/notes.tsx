"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { MdOutlinePushPin, MdPushPin } from "react-icons/md";

type Note = {
    id: string;
    text: string;
    link: string;
    pinned: boolean;
    createdAt: number;
};

const STORAGE_KEY = "newpage-notes";

function loadNotes(): Note[] {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        return JSON.parse(raw) as Note[];
    } catch {
        return [];
    }
}

function saveNotes(notes: Note[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

export default function Notes() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [draft, setDraft] = useState("");
    const [draftLink, setDraftLink] = useState("");
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setNotes(loadNotes());
        setLoaded(true);
    }, []);

    useEffect(() => {
        if (loaded) saveNotes(notes);
    }, [notes, loaded]);

    const addNote = () => {
        const text = draft.trim();
        const link = draftLink.trim();
        if (!text) return;
        setNotes((prev) => [
            {
                id: crypto.randomUUID(),
                text,
                link,
                pinned: false,
                createdAt: Date.now(),
            },
            ...prev,
        ]);
        setDraft("");
        setDraftLink("");
    };

    const togglePin = (id: string) => {
        setNotes((prev) =>
            prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)),
        );
    };

    const deleteNote = (id: string) => {
        setNotes((prev) => prev.filter((n) => n.id !== id));
    };

    const sorted = [...notes].sort((a, b) => {
        if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
        return b.createdAt - a.createdAt;
    });

    if (!loaded) return null;

    return (
        <div className="w-full max-w-2xl mx-auto px-4">
            <div className="flex flex-col w-full gap-2 p-2 mb-6 border">
                <Input
                    className="py-4"
                    type="text"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    // onKeyDown={(e) => e.key === "Enter" && addNote()}
                    placeholder="Write a note..."
                />
                <Input
                    className="py-4"
                    type="text"
                    value={draftLink}
                    onChange={(e) => setDraftLink(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addNote()}
                    placeholder="Add link"
                />
                <Button onClick={addNote} variant={"secondary"} size={"sm"}>
                    Add
                </Button>
            </div>

            <div className="flex flex-col gap-2 w-full h-125 overflow-auto">
                {sorted.map((note) => (
                    <div
                        key={note.id}
                        className={cn(
                            "flex w-full items-center gap-3 px-4 py-3 border group transition-colors",
                            note.pinned
                                ? "bg-foreground/10"
                                : "bg-foreground/0",
                        )}
                    >
                        <Button
                            onClick={() => togglePin(note.id)}
                            size={"icon-sm"}
                            variant={"outline"}
                            title={note.pinned ? "Unpin" : "Pin"}
                        >
                            {note.pinned ? (
                                <MdPushPin className="size-4" />
                            ) : (
                                <MdOutlinePushPin className="size-4" />
                            )}
                        </Button>
                        <div className="w-full">
                            <p className="flex-1 text-sm break-all">
                                {note.text}
                            </p>
                            <Link
                                href={note.link}
                                target="_blank"
                                className="text-sm text-blue-500 break-all truncate w-[40%]"
                            >
                                {note.link}
                            </Link>
                        </div>
                        <Button
                            variant={"destructive"}
                            size={"icon-sm"}
                            onClick={() => deleteNote(note.id)}
                            className="group-hover:opacity-100"
                            title="Delete"
                        >
                            <IoTrashOutline className="size-4" />
                        </Button>
                    </div>
                ))}
            </div>

            {sorted.length === 0 && (
                <p className="text-center text-white/20 text-sm mt-8">
                    No notes yet. Type above and press Enter.
                </p>
            )}
        </div>
    );
}
