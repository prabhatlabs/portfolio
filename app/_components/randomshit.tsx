"use client";

import React, { useState, useEffect, useRef } from "react";
import { myInfo, skillsArray, projects, contactLinksArray } from "@/data/pages";
import { Terminal } from "lucide-react";

type Line = {
    type: "input" | "output" | "error" | "info";
    content: string;
    prompt?: string;
};

const cleanText = (text: string) =>
    text.replace(/\|\|/g, "").replace(/\\\\/g, "\n").replace(/\\n/g, "\n");

const FILES = {
    "about.txt": cleanText(myInfo.description),
    "skills.txt": skillsArray.map((s) => `- ${s.name} (${s.type})`).join("\n"),
    "projects.txt": projects
        .map((p) => `[${p.title}]\n${p.description}`)
        .join("\n\n"),
    "contact.txt": contactLinksArray
        .map((c) => `${c.name}: ${c.url}`)
        .join("\n"),
    "README.md":
        'Welcome to my terminal. Try typing "help" to see what I can do.',
};

const COMMANDS_HELP: Record<string, string> = {
    help: "Show this help message",
    ls: "List directory contents",
    cat: "Display file content",
    whoami: "Display current user info",
    skills: "List my technical skills",
    projects: "Show my featured projects",
    contact: "Show contact links",
    ...Object.fromEntries(
        contactLinksArray.map((c) => [
            c.name.toLowerCase(),
            `Open my ${c.name} profile`,
        ]),
    ),
    clear: "Clear the terminal screen",
    date: "Display current date",
    echo: "Print text to terminal",
    history: "Show command history",
    exit: "End current session",
};

export default function RandomShit({ onClose }: { onClose?: () => void }) {
    const [history, setHistory] = useState<Line[]>([
        { type: "info", content: "PrabhatLabs v1.0.0 (tty1)" },
        { type: "info", content: 'Type "help" for a list of commands.' },
    ]);
    const [input, setInput] = useState("");
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [currentDir, setCurrentDir] = useState("~");

    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleTerminalClick = () => {
        inputRef.current?.focus();
    };

    const renderPrompt = (dir: string) => (
        <span className="flex items-center">
            <span className="text-terminal-user font-bold">guest</span>
            <span className="text-foreground">@</span>
            <span className="text-primary">portfolio</span>
            <span className="text-terminal-prompt mx-0.5">:</span>
            <span className="text-foreground/70">{dir}</span>
            <span className="text-terminal-prompt ml-1">$</span>
        </span>
    );

    const handleCommand = (rawCmd: string) => {
        const trimmedCmd = rawCmd.trim();

        if (!trimmedCmd) {
            setHistory((prev) => [
                ...prev,
                { type: "input", content: "", prompt: currentDir },
            ]);
            return;
        }

        const args = trimmedCmd.split(/\s+/);
        const cmd = args[0].toLowerCase();
        const newLines: Line[] = [
            { type: "input", content: trimmedCmd, prompt: currentDir },
        ];

        setCommandHistory((prev) => [trimmedCmd, ...prev]);
        setHistoryIndex(-1);

        // Check for social commands
        const socialLink = contactLinksArray.find(
            (c) => c.name.toLowerCase() === cmd,
        );
        if (socialLink) {
            newLines.push({
                type: "info",
                content: `Opening ${socialLink.name}...`,
            });
            window.open(socialLink.url, socialLink.target || "_blank");
            setHistory((prev) => [...prev, ...newLines]);
            return;
        }

        switch (cmd) {
            case "help":
                newLines.push({
                    type: "output",
                    content: Object.entries(COMMANDS_HELP)
                        .map(([name, desc]) => `${name.padEnd(12)} - ${desc}`)
                        .join("\n"),
                });
                break;
            case "ls":
                newLines.push({
                    type: "output",
                    content: Object.keys(FILES).join("  "),
                });
                break;
            case "cat":
                const fileName = args[1];
                if (!fileName) {
                    newLines.push({
                        type: "error",
                        content: "cat: missing filename",
                    });
                } else if (FILES[fileName as keyof typeof FILES]) {
                    newLines.push({
                        type: "output",
                        content: FILES[fileName as keyof typeof FILES],
                    });
                } else {
                    newLines.push({
                        type: "error",
                        content: `cat: ${fileName}: No such file`,
                    });
                }
                break;
            case "whoami":
                newLines.push({
                    type: "output",
                    content: `${myInfo.name}\n${myInfo.title}`,
                });
                break;
            case "skills":
                newLines.push({ type: "output", content: FILES["skills.txt"] });
                break;
            case "projects":
                newLines.push({
                    type: "output",
                    content: FILES["projects.txt"],
                });
                break;
            case "contact":
                newLines.push({
                    type: "output",
                    content: FILES["contact.txt"],
                });
                break;
            case "date":
                newLines.push({
                    type: "output",
                    content: new Date().toString(),
                });
                break;
            case "clear":
                setHistory([]);
                return;
            case "history":
                newLines.push({
                    type: "output",
                    content: [...commandHistory]
                        .reverse()
                        .map((c, i) => `${i + 1}  ${c}`)
                        .join("\n"),
                });
                break;
            case "echo":
                newLines.push({
                    type: "output",
                    content: args.slice(1).join(" "),
                });
                break;
            case "cd":
                const dir = args[1];
                if (!dir || dir === "~" || dir === "/") {
                    setCurrentDir("~");
                } else {
                    newLines.push({
                        type: "error",
                        content: `cd: ${dir}: No such directory`,
                    });
                }
                break;
            case "exit":
                newLines.push({ type: "info", content: "Session closed." });
                if (onClose) setTimeout(onClose, 500);
                break;
            default:
                newLines.push({
                    type: "error",
                    content: `sh: command not found: ${cmd}`,
                });
        }

        setHistory((prev) => [...prev, ...newLines]);
    };

    const onKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleCommand(input);
            setInput("");
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                const nextIndex = historyIndex + 1;
                setHistoryIndex(nextIndex);
                setInput(commandHistory[nextIndex]);
            }
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex > 0) {
                const nextIndex = historyIndex - 1;
                setHistoryIndex(nextIndex);
                setInput(commandHistory[nextIndex]);
            } else {
                setHistoryIndex(-1);
                setInput("");
            }
        } else if (e.key === "Tab") {
            e.preventDefault();
            const args = input.trim().split(/\s+/);
            if (args.length === 2 && args[0].toLowerCase() === "cat") {
                const partial = args[1];
                const match = Object.keys(FILES).find((f) =>
                    f.startsWith(partial),
                );
                if (match) {
                    setInput(`${args[0]} ${match}`);
                }
            }
        }
    };

    return (
        <div className="fixed top-0 left-0 h-dvh w-screen z-500 flex items-center justify-center p-20">
            <div
                className="h-100 sm:h-120 lg:h-full w-full flex flex-col bg-background/80 border border-border rounded-lg overflow-hidden shadow-2xl font-mono text-xs sm:text-sm group backdrop-blur-md"
                onClick={handleTerminalClick}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-3 py-1.5 bg-muted/50 border-b border-border/50">
                    <div className="flex items-center gap-2">
                        <Terminal size={14} className="text-primary" />
                        <span className="text-[10px] sm:text-xs text-muted-foreground tracking-widest">
                            guest@portfolio — zsh
                        </span>
                    </div>
                    <div className="flex gap-1.5">
                        <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-green-500" />
                        <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-yellow-500" />
                        <div
                            className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-destructive"
                            onClick={() => onClose()}
                        />
                    </div>
                </div>

                {/* Content */}
                <div
                    ref={scrollRef}
                    className="flex-1 p-3 sm:p-4 overflow-y-auto custom-scrollbar selection:bg-primary/30"
                >
                    {history.map((line, i) => (
                        <div key={i} className="mb-1.5 leading-relaxed">
                            {line.type === "input" ? (
                                <div className="flex flex-wrap items-center gap-x-2">
                                    {renderPrompt(line.prompt || "~")}
                                    <span className="text-foreground">
                                        {line.content}
                                    </span>
                                </div>
                            ) : line.type === "error" ? (
                                <div className="text-destructive">
                                    <span className="mr-2">✗</span>
                                    {line.content}
                                </div>
                            ) : line.type === "info" ? (
                                <div className="text-muted-foreground italic opacity-70">
                                    {line.content}
                                </div>
                            ) : (
                                <div className="text-foreground/80 whitespace-pre-wrap">
                                    {line.content}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Active Input */}
                    <div className="flex items-center gap-x-2">
                        {renderPrompt(currentDir)}
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={onKeyDown}
                            className="flex-1 bg-transparent border-none outline-none text-foreground caret-terminal-prompt"
                            spellCheck={false}
                            autoComplete="off"
                            autoFocus
                        />
                    </div>
                </div>

                <style jsx>{`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 4px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: var(--color-border);
                        border-radius: 10px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: var(--color-muted-foreground);
                    }
                `}</style>
            </div>
        </div>
    );
}
