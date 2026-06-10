import { ContributionChart } from "@/components/githubchart";

export function Contributions() {
    return (
        <div className="">
            <h2 className="p-6 mt-16 sm:mt-20 md:mt-24 border-y text-3xl md:text-5xl font-bold">
                <span>Con</span>
                <span className=" text-muted-foreground">tributions</span>
            </h2>
            <div className="p-4 border-b">
                <ContributionChart username="prabhatlabs" />
            </div>
        </div>
    );
}
