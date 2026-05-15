"use client";
import { useEffect, useState } from "react";
import { useArtistStore, useCategoryStore } from "../store";
import { CTA, FeaturedSection, HeroSection, HowItWorks } from "../components/pages/home";



export default function Home() {
  const [loading, setLoading] = useState(true);
  const { fetchArtists, artists } = useArtistStore();
  const { fetchCategories, categories } = useCategoryStore();

  useEffect(() => { const t = setTimeout(() => setLoading(false), 800); return () => clearTimeout(t); }, []);

  useEffect(() => {
    fetchArtists("", "", true);
    fetchCategories();
  }, []);




  return (
    <div className="w-full">
      {/* Hero */}
      <HeroSection categories={categories} />

      {/* Featured Artists */}
      <FeaturedSection artists={artists} loading={loading} />


      {/* How It Works */}
      <HowItWorks />

      {/* CTA */}
      <CTA />


    </div>
  );
}
