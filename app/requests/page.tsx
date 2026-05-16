"use client";

import { useEffect, useState } from "react";
import { apiFetcher } from "@/lib/api-fetcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { IoMdRefresh, IoMdTrash } from "react-icons/io";
import { RiCheckDoubleFill } from "react-icons/ri";

interface IContactRequest {
    id: number;
    timestamp: string;
    status: "READ" | "UNREAD";
    name: string;
    email: string;
    subject: string;
    body: string;
}

interface IContactRequestsResponse {
    data: Contact[];
    pagination: {
        total: number;
    };
}

function RequestCard({ contact }: { contact: IContactRequest }) {
    return (
        <div
            className={`${contact.status === "UNREAD" ? "bg-muted" : ""} border`}
        >
            <div className="flex flex-row items-start justify-between p-2">
                <div className="">
                    <h3 className="text-lg flex items-center gap-2">
                        {contact.subject}
                        {contact.status === "UNREAD" && (
                            <span className="w-2 h-2 bg-primary rounded-full" />
                        )}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        From: {contact.name} ({contact.email})
                    </p>
                </div>
                <div className="flex gap-2">
                    {contact.status === "UNREAD" && (
                        <Button
                            size="icon"
                            variant="outline"
                            onClick={() => markAsRead(contact.id)}
                        >
                            <RiCheckDoubleFill />
                        </Button>
                    )}
                    <Button
                        size="icon"
                        variant="destructive"
                        onClick={() => deleteContact(contact.id)}
                    >
                        <IoMdTrash />
                    </Button>
                </div>
            </div>
            <div>
                <p className="px-2 mb-2 whitespace-pre-wrap text-sm">
                    {contact.body}
                </p>
                <Separator />
                <p className="px-2 text-[10px] text-muted-foreground font-mono">
                    {new Date(contact.timestamp).toLocaleString()}
                </p>
            </div>
        </div>
    );
}

export default function RequestsPage() {
    const [token, setToken] = useState<string | null>(null);
    const [inputToken, setInputToken] = useState("");
    const [contactRequests, setContactRequests] = useState<IContactRequest[]>(
        [],
    );
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = sessionStorage.getItem("auth-token");
        if (storedToken) {
            setToken(storedToken);
            fetchContactRequests();
        }
    }, []);

    async function fetchContactRequests() {
        setLoading(true);
        setError(null);
        try {
            const res =
                await apiFetcher<IContactRequestsResponse>("/api/contact");
            setContactRequests(res.data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    function handleTokenSubmit(e: React.FormEvent) {
        e.preventDefault();
        sessionStorage.setItem("auth-token", inputToken);
        setToken(inputToken);
        fetchContactRequests();
    }

    async function markAsRead(id: number) {
        try {
            await apiFetcher(`/api/contact/${id}`, { method: "PATCH" });
            setContactRequests((prev) =>
                prev.map((c) => (c.id === id ? { ...c, status: "READ" } : c)),
            );
        } catch (err: any) {
            alert(err.message);
        }
    }

    async function deleteContact(id: number) {
        if (!confirm("Are you sure?")) return;
        try {
            await apiFetcher(`/api/contact/${id}`, { method: "DELETE" });
            setContactRequests((prev) => prev.filter((c) => c.id !== id));
        } catch (err: any) {
            alert(err.message);
        }
    }

    async function markAllAsRead() {
        try {
            await apiFetcher("/api/contact", { method: "PATCH" });
            setContactRequests((prev) =>
                prev.map((c) => ({ ...c, status: "READ" })),
            );
        } catch (err: any) {
            alert(err.message);
        }
    }

    async function deleteAll() {
        if (!confirm("Delete ALL entries?")) return;
        try {
            await apiFetcher("/api/contact", { method: "DELETE" });
            setContactRequests([]);
        } catch (err: any) {
            alert(err.message);
        }
    }

    if (!token) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
                <form
                    onSubmit={handleTokenSubmit}
                    className="w-full max-w-sm space-y-4"
                >
                    <h1 className="text-2xl font-bold text-center">
                        Admin Access
                    </h1>
                    <Input
                        type="password"
                        placeholder="Enter Token"
                        value={inputToken}
                        onChange={(e) => setInputToken(e.target.value)}
                        required
                    />
                    <Button type="submit" className="w-full">
                        Access
                    </Button>
                </form>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-6">
            <div className="flex justify-between items-center gap-2 mt-4 md:mt-6 mb-8 md:mb-12">
                <h1 className="text-xl md:text-2xl font-bold">
                    Contact Requests
                </h1>
                <div className="space-x-2">
                    <Button
                        size={"icon"}
                        variant="outline"
                        onClick={fetchContactRequests}
                        disabled={loading}
                    >
                        <IoMdRefresh />
                    </Button>
                    <Button
                        size={"icon"}
                        variant="outline"
                        onClick={markAllAsRead}
                    >
                        <RiCheckDoubleFill />
                    </Button>
                    <Button
                        size={"icon"}
                        variant="destructive"
                        onClick={deleteAll}
                    >
                        <IoMdTrash />
                    </Button>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-destructive/10 text-destructive rounded-md">
                    {error}
                </div>
            )}

            <div className="grid gap-4">
                {contactRequests.length === 0 && !loading && (
                    <p className="text-center py-10 text-muted-foreground">
                        No requests found.
                    </p>
                )}
                {contactRequests.map((contact, index) => (
                    <RequestCard key={index} contact={contact} />
                ))}
            </div>
        </div>
    );
}
