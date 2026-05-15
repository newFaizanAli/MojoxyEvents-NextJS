import { lazy } from "react";

const HeroSection = lazy(() => import("./HeroSection"))
const FeaturedSection = lazy(() => import("./FeaturedSection"))
const CTA = lazy(() => import("./CTA"))
const HowItWorks = lazy(() => import("./HowItWorks"))

export {
    HeroSection,
    FeaturedSection,
    CTA,
    HowItWorks
}