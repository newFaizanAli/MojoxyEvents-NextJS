import type { Metadata } from "next";

export const baseMetadata: Metadata = {
  title: {
    default: "Mojoxy",
    template: "%s | Mojoxy",
  },
  description: "Default description for my app",
  keywords: ["nextjs", "app", "web"],
  openGraph: {
    type: "website",
    siteName: "Mojoxy",
  },
};
