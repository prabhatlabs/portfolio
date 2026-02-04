"use client";

import { Button } from "@/components/ui/button";
import useLayoutToggle from "@/hooks/useLayoutToggle";
import { Layout } from "lucide-react";

export default function LayoutToggle({ className }: { className?: string }) {
    const { ToggleLayout } = useLayoutToggle();
    return (
        <Button
            size={'icon'}
            variant={'ghost'}
            className={className}
            onClick={ToggleLayout}
        >
            <Layout />
        </Button>
    )
}