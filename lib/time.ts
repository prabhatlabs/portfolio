export function formatDateTime(t: number) {
    const date = new Date(t);
    return date.toLocaleString();
}

export function formatDate(t: number) {
    const date = new Date(t);
    return date.toLocaleDateString();
}

export function formatTime(t: number) {
    const date = new Date(t);
    return date.toLocaleTimeString();
}
