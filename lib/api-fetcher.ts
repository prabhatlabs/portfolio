export async function apiFetcher<T>(
    url: string,
    options: RequestInit = {},
): Promise<T> {
    const token = typeof window !== "undefined" ? sessionStorage.getItem("auth-token") : null;

    const headers = new Headers(options.headers);
    if (token) {
        headers.set("x-auth-token", token);
    }
    headers.set("Content-Type", "application/json");

    const response = await fetch(url, {
        ...options,
        headers,
    });

    const data = await response.json();

    if (!response.ok) {
        if (response.status === 401) {
            sessionStorage.removeItem("auth-token");
            window.location.reload();
        }
        throw new Error(data.error || "An error occurred");
    }

    return data as T;
}
