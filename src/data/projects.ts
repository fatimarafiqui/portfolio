export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  summary: string;
  role: string;
  timeline: string;
  thumbnail: string;
  video?: string;
  poster?: string;
  href: string;
}

export const projects: Project[] = [
  {
    id: "dbt-job",
    title: "dbt Job",
    slug: "dbt-job",
    category: "Shipped Product",
    tags: ["Enterprise UX", "Data Engineering", "Microsoft Fabric"],
    summary:
      "Bringing dbt transformations into Data Factory so data teams can build, schedule, and monitor dbt workflows in one place.",
    role: "Product Designer",
    timeline: "2025 - 2026",
    thumbnail: "/images/projects/dbt-job-thumb.png",
    href: "/projects/dbt-job",
  },
  {
    id: "copilot-in-data-factory",
    title: "Copilot in Data Factory",
    slug: "copilot-in-data-factory",
    category: "Shipped Product",
    tags: ["AI/ML", "Enterprise UX", "Conversational Design"],
    summary:
      "An intelligent copilot agent for Azure Data Factory that diagnoses pipeline failures and optimizes configurations.",
    role: "Product Designer",
    timeline: "2025 - 2026",
    thumbnail: "/images/projects/copilot-in-data-factory-thumb.png",
    href: "/projects/copilot-in-data-factory",
  },
  {
    id: "clover-designer",
    title: "Clover Designer",
    slug: "clover-designer",
    category: "Shipped Product",
    tags: ["Web UX", "Interaction Design", "Networking"],
    summary: "A shipped product focused on web UX and interaction design.",
    role: "Product Designer",
    timeline: "",
    thumbnail: "/images/projects/clover-designer-thumb.png",
    href: "/projects/clover-designer",
  },
  {
    id: "ar-anchor-cards",
    title: "AR Anchor Cards",
    slug: "ar-anchor-cards",
    category: "Passion Project",
    tags: ["Augmented Reality", "Concept", "Mobile UX"],
    summary:
      "Navigation for new settlers using AR-powered contextual cards in Google Maps.",
    role: "UX Research • UX Design • Interaction Design • Usability Testing",
    timeline: "June - August 2020",
    thumbnail: "/images/projects/ar-anchor-cards-thumb.png",
    video: "/images/projects/ar-anchor-cards/card.mp4",
    poster: "/images/projects/ar-anchor-cards/card-poster.webp",
    href: "/projects/ar-anchor-cards",
  },
];
