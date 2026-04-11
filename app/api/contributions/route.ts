import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const username = req.nextUrl.searchParams.get("username");

    const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

    const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables: { username } }),
    });

    const data = await res.json();
    const weeks =
        data.data.user.contributionsCollection.contributionCalendar.weeks;

    // flatten to { "2024-03-01": 5, ... }
    const contributions: Record<string, number> = {};
    for (const week of weeks) {
        for (const day of week.contributionDays) {
            contributions[day.date] = day.contributionCount;
        }
    }

    return NextResponse.json(contributions);
}
