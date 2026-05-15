// lib/seo.ts
import type { Metadata } from "next";

type SEOProps = {
  title?: string;
  description?: string;
  path?: string;
};

export function createMetadata({
  title,
  description,
  path,
}: SEOProps = {}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
    },
  };
}
