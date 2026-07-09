import { projects } from "@/data/root";
import { getAllPosts } from "@/lib/blogs";
import envvars from "@/lib/envvars";

export const revalidate = 3600;

const cities = [
    "raipur",
    "indore",
    "bhilai",
    "bhopal",
    "nagpur",
    "mumbai",
    "delhi",
    "bangalore",
    "hyderabad",
    "pune",
    "ahmedabad",
    "jaipur",
];

export async function GET() {
    const posts = await getAllPosts();
    const visibleProjects = projects.filter((p) => p.show);

    const urlset = [
        `
  <url>
    <loc>${envvars.BASE_URL}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${envvars.BASE_URL}/preview.webp</image:loc>
      <image:title>Prabhat Mishra — Software Developer</image:title>
    </image:image>
    <image:image>
      <image:loc>${envvars.BASE_URL}/me.webp</image:loc>
      <image:title>Prabhat Mishra</image:title>
    </image:image>
    <image:image>
      <image:loc>${envvars.BASE_URL}/logo.webp</image:loc>
      <image:title>prabhatlabs logo</image:title>
    </image:image>
  </url>`,
        `
  <url>
    <loc>${envvars.BASE_URL}/blog</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`,
        `
  <url>
    <loc>${envvars.BASE_URL}/projects</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`,
        `
  <url>
    <loc>${envvars.BASE_URL}/uses</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`,
        `
  <url>
    <loc>${envvars.BASE_URL}/now</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.4</priority>
  </url>`,
        `
  <url>
    <loc>${envvars.BASE_URL}/games</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`,
        `
  <url>
    <loc>${envvars.BASE_URL}/locations</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.5</priority>
  </url>`,
        ...cities.map(
            (city) => `
  <url>
    <loc>${envvars.BASE_URL}/locations/${city}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>`,
        ),
        ...posts.map(
            (post) => `
  <url>
    <loc>${envvars.BASE_URL}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.date).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    ${
        post.coverImage
            ? `<image:image>
      <image:loc>${post.coverImage.startsWith("http") ? post.coverImage : `${envvars.BASE_URL}${post.coverImage}`}</image:loc>
      <image:title>${post.title}</image:title>
    </image:image>`
            : ""
    }
  </url>`,
        ),
        ...visibleProjects.map(
            (p) => `
  <url>
    <loc>${envvars.BASE_URL}/projects#${p.title.toLowerCase().replace(/\s+/g, "-")}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`,
        ),
    ].join("\n");

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlset}
</urlset>`;

    return new Response(xml, {
        headers: {
            "Content-Type": "application/xml",
        },
    });
}
