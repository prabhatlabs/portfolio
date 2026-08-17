"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { MdOutlinePushPin, MdPushPin } from "react-icons/md";

type Note = {
    id: string;
    text: string;
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
        if (!text) return;
        setNotes((prev) => [
            { id: crypto.randomUUID(), text, pinned: false, createdAt: Date.now() },
            ...prev,
        ]);
        setDraft("");
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
            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addNote()}
                    placeholder="Write a note..."
                    className="flex-1 bg-white/5 border border-white/10 text-white px-4 py-2.5 text-sm placeholder:text-white/30 focus:outline-none focus:border-white/25"
                />
                <button
                    onClick={addNote}
                    className="px-4 py-2.5 bg-white/10 text-white text-sm border border-white/10 hover:bg-white/20 transition-colors"
                >
                    Add
                </button>
            </div>

            <div className="flex flex-col gap-2">
                {sorted.map((note) => (
                    <div
                        key={note.id}
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 border border-white/10 group transition-colors",
                            note.pinned ? "bg-white/10" : "bg-white/5",
                        )}
                    >
                        <button
                            onClick={() => togglePin(note.id)}
                            className="shrink-0 text-white/40 hover:text-white transition-colors"
                            title={note.pinned ? "Unpin" : "Pin"}
                        >
                            {note.pinned ? (
                                <MdPushPin className="size-4" />
                            ) : (
                                <MdOutlinePushPin className="size-4" />
                            )}
                        </button>
                        <span className="flex-1 text-sm text-white/80 break-all">
                            {note.text}
                        </span>
                        <button
                            onClick={() => deleteNote(note.id)}
                            className="shrink-0 text-white/30 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                            title="Delete"
                        >
                            <IoTrashOutline className="size-4" />
                        </button>
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
