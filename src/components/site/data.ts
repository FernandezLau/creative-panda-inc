const C = "https://mycreativepanda.com/wp-content/themes/yootheme/cache";

export const LOGO_URL =
  "https://mycreativepanda.com/wp-content/uploads/2024/03/OFFICIAL-LOGO-2024-e1710225088931.png";
export const YOUTUBE_URL = "https://www.youtube.com/@mycreativepanda8598";
export const SALES_EMAIL = "sales@mycreativepanda.com";

export const nav = [
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/portfolio" },
  { label: "Systems", href: "/products" },
  { label: "Careers", href: "/careers" },
];

export const projects = [
  { name: "Municipality of Talibon", place: "Bohol", url: "https://talibon.gov.ph", img: `${C}/cb/image-20-cbe0a610.png` },
  { name: "Jelexie Bakeshop", place: "Business", url: "https://jelexie.ph/", img: `${C}/06/image-12-06568f3d.png` },
  { name: "Municipality of Milagros", place: "Masbate", url: "https://milagrosmasbate.gov.ph/", img: `${C}/1d/image-15-1d7ee68b.png` },
  { name: "Municipality of Alangalang", place: "Leyte", url: "https://alangalangleyte.gov.ph/", img: `${C}/89/image-8-89b92687.png` },
  { name: "National Academy of Sports", place: "Philippines", url: "https://nas.edu.ph/", img: `${C}/f3/NAS-f3307fa5.png` },
  { name: "Municipality of Asturias", place: "Cebu", url: "https://asturiascebu.gov.ph/", img: "https://mycreativepanda.com/wp-content/uploads/2024/03/ASTURIAS.png" },
  { name: "Municipality of Alegria", place: "Cebu", url: "https://alegriacebu.gov.ph/", img: `${C}/0a/alegria2-0a94ca01.jpeg` },
  { name: "Municipality of Alcoy", place: "Cebu", url: "https://alcoycebu.gov.ph/", img: `${C}/5c/ALCOY-5c773a4f.png` },
  { name: "Municipality of Madridejos", place: "Cebu", url: "https://madridejoscebu.gov.ph/", img: `${C}/ba/MADRIDEJOS-ba112a8b.png` },
] as const;

export const systems = [
  { name: "National Library of the Philippines", img: `${C}/64/nlp-1-64d49a9f.png` },
  { name: "City of Caloocan", img: `${C}/3d/lgu-caloocan-3d3cca48.png` },
  { name: "Landbank of the Philippines Insurance Brokerage Inc.", img: `${C}/fd/libi-fd8d08f2.png` },
  { name: "Municipality of Aborlan", img: `${C}/f7/aws-f7aea602.png` },
  { name: "Municipality of Quezon", img: `${C}/92/lgu-quezon-922c9b38.png` },
  { name: "National Authority for Child Care", img: `${C}/7e/nacc-1-7ead7bd1.png` },
];

export const clients = [
  "National Library of the Philippines",
  "City of Caloocan",
  "TESDA Region III",
  "National Academy of Sports",
  "Landbank Insurance Brokerage",
  "National Authority for Child Care",
  "Zamboanga State College of Marine Sciences & Technology",
  "Talibon, Bohol",
  "Milagros, Masbate",
  "Alangalang, Leyte",
  "Asturias, Cebu",
  "Alegria, Cebu",
  "Alcoy, Cebu",
  "Madridejos, Cebu",
];

export const GREETING_COVER = `${C}/29/GREET1-1-2984601f.png`;

export const greetings = ["TESDA Region III", "Arayat, Pampanga", "Talavera, Nueva Ecija", "Concepcion"];

/* ---------------- Careers ---------------- */

/** HR system feed of open positions (read on the server only, always over HTTPS). */
export const CAREERS_API_URL = "https://mcpehris.mycreativepanda.ph/api/vacant_positions";
/** Secure HR portal where applicants finish their application. */
export const CAREERS_APPLY_URL = "https://mcpehris.mycreativepanda.ph/online-job-application/";

const U = "https://mycreativepanda.com/wp-content/uploads";
/** Photo shown for each department (matched loosely by name, like the old WordPress page). */
export const departmentImages: { match: string; img: string }[] = [
  { match: "ADMIN DEPARTMENT", img: `${U}/2025/05/Untitled-design-17.png` },
  { match: "SALES AND MARKETING DEPARTMENT", img: `${U}/2026/04/finance-img-scaled.jpg` },
  { match: "TECHNICAL SUPPORT DEPARTMENT", img: `${U}/2025/05/Untitled-design-20.png` },
  { match: "SUPPORT DEPARTMENT", img: `${U}/2025/05/Untitled-design-20.png` },
  { match: "FINANCE DEPARTMENT", img: `${U}/2026/04/finance.png` },
  { match: "HUMAN RESOURCE DEPARTMENT", img: `${U}/2026/04/hr-image-scaled.jpg` },
];
export const DEFAULT_DEPARTMENT_IMAGE = `${U}/2026/04/hr-image-scaled.jpg`;
/** Department names in the HR feed that mean the same team. */
export const departmentAliases: Record<string, string> = {
  "HR DEPARTMENT": "HUMAN RESOURCE DEPARTMENT",
};
