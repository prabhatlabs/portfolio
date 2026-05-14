import { ContributionChart } from "@/components/githubchart";
import { LineShadowText } from "@/components/ui/line-shadow-text";

export function Contributions() {
    return (
        <div className="">
            <h2 className="p-6 mt-16 sm:mt-20 md:mt-24 border-y text-3xl md:text-5xl font-bold">
                <LineShadowText className="" shadowColor={"var(--foreground)"}>
                    Con
                </LineShadowText>
                <LineShadowText
                    className=" text-foreground/60"
                    shadowColor={"var(--muted-foreground)"}
                >
                    tributions
                </LineShadowText>
            </h2>
            <div className="p-4 border-b">
                <ContributionChart username="prabhatlabs" />
            </div>
        </div>
    );
}
