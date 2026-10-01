export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Lyuba Nesteroff",
    role: "Product Design Lead",
    company: "Juniper Networks",
    quote:
      "Fatima is adaptable and flexible when working to identify and solve problems in interactive design workflows. Her strong communication and active listening skills enable her to relate to others. While maintaining attention to details and visual aesthetics, Fatima keeps an open mind which makes her approachable and easy to work with.",
  },
  {
    name: "Yelena Kozlova",
    role: "Senior UX Designer",
    company: "Juniper Networks",
    quote:
      "Fatima takes initiative to support her fellow design team members. She is open to take on challenging projects, flexible and receptive to feedback, and overall dedicated to elevating her design expertise. She also takes the lead to promote the value of design in the tech industry with her writing and presentations.",
  },
  {
    name: "Avinash Agrawal",
    role: "Senior Staff Engineer",
    company: "Atlassian",
    quote:
      "Fatima is an awesome person to work with, full of energy and has a go getter attitude. She is an asset to any team. She's not afraid of a challenge, and has proven that she can drive multiple projects forward even with vague requirements.",
  },
];
