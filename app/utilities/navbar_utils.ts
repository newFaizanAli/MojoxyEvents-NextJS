import { ROUTES_PATHS } from "./page_routes";

export const NAV_LINKS = [
  { key: "home", href: ROUTES_PATHS.PUBLIC.HOME, label: "Home" },
  { key: "about", href: ROUTES_PATHS.PUBLIC.ABOUT, label: "About" },
  {
    key: "categories",
    href: ROUTES_PATHS.PUBLIC.CATEGORY,
    label: "Categories",
  },
  { key: "artists", href: ROUTES_PATHS.PUBLIC.ARTIST.LIST, label: "Artists" },
];

export const DROPDOWN_LINKS = [
  { label: "Dashboard", href: "/dashboard", icon: "grid" },
  { label: "Settings", href: "/settings", icon: "settings" },
];
