export function formatDateTime(t: number) {
    const date = new Date(t);
    return date.toLocaleString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });
}

export function formatDate(t: number) {
    const date = new Date(t);
    return date.toLocaleDateString();
}

export function formatTime(t: number) {
    const date = new Date(t);
    return date.toLocaleTimeString();
}

export function formatDateMMMMDDYYYY(t: string | Date) {
    if (!t) {
        return new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    }
    return new Date(t).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}
