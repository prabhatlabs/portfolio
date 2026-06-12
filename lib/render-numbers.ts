/**
 * returns 1000 -> 1k, 100000 -> 100k
 * with max of 4 digits (expecting 900k max!)
 * 1456 -> 1.456k, 10230 -> 10.23k, 120340 -> 120.3k
 * @param n: number
 * @returns string
 */
export function renderNumber(n: number): string {
    if (n < 1000) return String(n);

    const k = n / 1000;

    if (k < 10) return `${parseFloat(k.toFixed(3))}k`;
    if (k < 100) return `${parseFloat(k.toFixed(2))}k`;
    return `${parseFloat(k.toFixed(1))}k`;
}
