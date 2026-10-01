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
  href: string;
}

export const projects: Project[] = [
  {
    id: "data-factory-agent",
    title: "Data Factory Agent",
    slug: "data-factory-agent",
    category: "Shipped Product",
    tags: ["AI/ML", "Enterprise UX", "Conversational Design"],
    summary:
      "An intelligent copilot agent for Azure Data Factory that diagnoses pipeline failures and optimizes configurations.",
    role: "Product Designer",
    timeline: "2025 - 2026",
    thumbnail: "/images/projects/data-factory-agent-thumb.png",
    href: "/projects/data-factory-agent",
  },
  {
    id: "unified-fabric-copilot",
    title: "Unified Fabric Copilot",
    slug: "unified-fabric-copilot",
    category: "Hackathon 2025",
    tags: ["AI/ML", "Copilot", "Developer Experience", "Microsoft Fabric"],
    summary:
      "A cross-platform AI experience designed to help developers build, configure, and operate end-to-end solutions in Microsoft Fabric.",
    role: "Senior Product Designer",
    timeline: "2025",
    thumbnail: "/images/projects/unified-fabric-copilot-thumb.png",
    href: "/projects/unified-fabric-copilot",
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
    href: "/projects/ar-anchor-cards",
  },
];
