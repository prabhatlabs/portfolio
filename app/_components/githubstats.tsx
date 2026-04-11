import { ContributionChart } from "@/components/githubchart";
import { LineShadowText } from "@/components/ui/line-shadow-text";

export function GithubStats() {
    return (
        <div className="space-y-4">
            <h2 className="p-6 mt-16 sm:mt-20 md:mt-24 border-y text-3xl md:text-5xl font-bold">
                <LineShadowText
                    className="italic"
                    shadowColor={"var(--foreground)"}
                >
                    Contributions
                </LineShadowText>
            </h2>
            <div className="px-4">
                <ContributionChart username="prabhatlabs" />
            </div>
        </div>
    );
}
