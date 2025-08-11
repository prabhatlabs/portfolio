"use client";
import { useTheme } from "next-themes";
import GitHubCalendar from "react-github-calendar";
import { IoLogoGithub } from "react-icons/io";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const GithubChart = () => {
    const { theme } = useTheme();
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl w-full flex justify-start items-center gap-2">
                    <IoLogoGithub />
                    <span>GitHub Contributions</span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <GitHubCalendar
                    username="prabhatm8000"
                    colorScheme={
                        theme === "light"
                            ? "light"
                            : theme === "dark"
                            ? "dark"
                            : undefined
                    }
                />
            </CardContent>
        </Card>
    );
};

export default GithubChart;
