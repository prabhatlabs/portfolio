const envvars = {
    BASE_URL: process.env.NEXT_PUBLIC_BASE_URL || "https://prabhatlabs.dev",
    DATABASE_URL: process.env.DATABASE_URL || "",
    GITHUB_TOKEN: process.env.GITHUB_TOKEN || "",
}

export default envvars;
