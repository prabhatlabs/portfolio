import envvars from "@/lib/envvars";
import { getAllPosts } from "@/lib/blogs";

export const revalidate = 3600;

export async function GET() {
    const posts = await getAllPosts();

    const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Prabhat Mishra - Blog</title>
    <description>Thoughts, learnings, and things I found worth writing down.</description>
    <link>${envvars.BASE_URL}</link>
    <atom:link href="${envvars.BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-US</language>
    ${posts
        .map(
            (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <description><![CDATA[${post.description}]]></description>
      <link>${envvars.BASE_URL}/blog/${post.slug}</link>
      <guid isPermaLink="true">${envvars.BASE_URL}/blog/${post.slug}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join("\n      ")}
    </item>`
        )
        .join("\n")}
  </channel>
</rss>`;

    return new Response(rss, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
