import { layoutContext, LayoutContextType } from "@/contexts/LayoutContext";
import { useContext } from "react";

export default function useLayoutToggle() {
    const ctx = useContext<LayoutContextType | null>(layoutContext);
    return {
        ...ctx
    }
}