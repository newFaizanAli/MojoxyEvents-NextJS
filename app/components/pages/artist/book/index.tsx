import { lazy } from "react";

const ArtistBookingHeroSec = lazy(() => import("./HeroSection"));
const ArtistBookingStepper = lazy(() => import("./BookingStepper"));
const ArtistBookingPackage = lazy(() => import("./ArtistPackage"));
const ArtistBookingDateTimeLoc = lazy(() => import("./DateTimeLoc"));
const ArtistBookingBudgetSection = lazy(() => import("./BudgetSection"));

export {
    ArtistBookingHeroSec,
    ArtistBookingStepper,
    ArtistBookingPackage,
    ArtistBookingDateTimeLoc,
    ArtistBookingBudgetSection
}