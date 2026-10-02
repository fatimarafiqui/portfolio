export interface Testimonial {
  name: string;
  role: string;
  company?: string;
  quote: string;
  year?: number;
  featured?: boolean;
  avatar?: string;
}

// Short excerpts from LinkedIn recommendations, newest first.
export const testimonials: Testimonial[] = [
  {
    name: "Dawn Ferguson",
    avatar: "/images/testimonials/dawn.jpg",
    role: "Senior UX Researcher",
    company: "Microsoft",
    year: 2025,
    featured: true,
    quote:
      "Fatima excels at **clarifying complex problems** by ensuring that we start each project with a **well-defined problem statement**.",
  },
  {
    name: "Zaki S",
    avatar: "/images/testimonials/zaki.jpg",
    role: "Principal Product Designer Architect",
    company: "Lucid Motors",
    year: 2024,
    featured: true,
    quote:
      "A **creative and analytical mindset** that often led to **breakthroughs** where others saw dead ends.",
  },
  {
    name: "Lisa Beam",
    avatar: "/images/testimonials/lisa.jpg",
    role: "Staff Product Designer",
    year: 2022,
    quote: "I was impressed by how **quickly she learned** the domain and the design library.",
  },
  {
    name: "Yelena V. Kozlova",
    avatar: "/images/testimonials/yelena.webp",
    role: "Design",
    company: "Cloudflare",
    year: 2020,
    quote:
      "Flexible and receptive to feedback, and overall **dedicated to elevating her design expertise**.",
  },
  {
    name: "Avinash Agrawal",
    avatar: "/images/testimonials/avatar-default.svg",
    role: "Engineering Leader",
    company: "Atlassian",
    year: 2020,
    quote: "**Full of energy** and a **go getter attitude**. She is an **asset to any team**.",
  },
  {
    name: "Lyuba Nesteroff",
    avatar: "/images/testimonials/lyuba.jpg",
    role: "Product Design Lead",
    company: "Juniper Networks",
    quote:
      "Fatima keeps an **open mind** which makes her **approachable and easy to work with**.",
  },
];
