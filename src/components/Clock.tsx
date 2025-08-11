"use client";

import { useEffect, useState } from "react";

const Clock = () => {
    const [time, setTime] = useState<string | null>(null);

    useEffect(() => {
        const intervalId = setInterval(
            () => setTime(new Date().toLocaleTimeString()),
            1000
        );
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="relative w-fit px-1.5 py-0.5 rounded-md border border-muted-foreground/30">
            {time}
        </div>
    );
};

export default Clock;
