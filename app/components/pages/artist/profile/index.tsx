import { lazy } from "react";

const ArtistProfileHeroSec = lazy(() => import("./HeroSection"))
const ArtistProfileMainContent = lazy(() => import("./MainContent"))
const ArtistProfileQuickInfo = lazy(() => import("./QuickInfo"))
const ArtistProfileGenreSec = lazy(() => import("./GenreSection"))
const ArtistProfileEventType = lazy(() => import("./EventType"))
const ArtistProfileCTA = lazy(() => import("./CTA"))


export {
    ArtistProfileHeroSec,
    ArtistProfileMainContent,
    ArtistProfileQuickInfo,
    ArtistProfileGenreSec,
    ArtistProfileEventType,
    ArtistProfileCTA
}