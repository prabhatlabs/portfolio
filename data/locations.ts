export type LocationCity = {
    slug: string;
    name: string;
    state: string;
    region: string;
};

export const cities: LocationCity[] = [
    { slug: "raipur", name: "Raipur", state: "Chhattisgarh", region: "Central India" },
    { slug: "indore", name: "Indore", state: "Madhya Pradesh", region: "Central India" },
    { slug: "bhilai", name: "Bhilai", state: "Chhattisgarh", region: "Central India" },
    { slug: "bhopal", name: "Bhopal", state: "Madhya Pradesh", region: "Central India" },
    { slug: "nagpur", name: "Nagpur", state: "Maharashtra", region: "Western India" },
    { slug: "mumbai", name: "Mumbai", state: "Maharashtra", region: "Western India" },
    { slug: "delhi", name: "Delhi", state: "Delhi", region: "Northern India" },
    { slug: "bangalore", name: "Bangalore", state: "Karnataka", region: "Southern India" },
    { slug: "hyderabad", name: "Hyderabad", state: "Telangana", region: "Southern India" },
    { slug: "pune", name: "Pune", state: "Maharashtra", region: "Western India" },
    { slug: "ahmedabad", name: "Ahmedabad", state: "Gujarat", region: "Western India" },
    { slug: "jaipur", name: "Jaipur", state: "Rajasthan", region: "Northern India" },
];

export const lastUpdated = "2026-07-10";
