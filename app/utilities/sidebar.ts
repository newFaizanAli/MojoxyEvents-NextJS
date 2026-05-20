import { IconName, UserRole } from "../types";
import { ROUTES_PATHS } from "./page_routes";

type SidebarLink = {
  icon: IconName;
  name: string;
  path: string;
  allowed: UserRole[];
  submenu?: {
    name: string;
    path: string;
    allowed: UserRole[];
  }[];
};

//  const links = [
//         { key: "dashboard", label: "Overview", icon: "grid" },
//         { key: "my-bookings", label: "My Bookings", icon: "calendar", badge: 2 },
//         { key: "favorites", label: "Favorites", icon: "heart" },
//         { key: "notifications", label: "Notifications", icon: "bell", badge: 2 },
//         { key: "profile", label: "My Profile", icon: "user" },
//         { key: "settings", label: "Settings", icon: "settings" },
//     ];

export const sidebar_links: SidebarLink[] = [
  {
    icon: "grid",
    name: "Dashboard",
    path: "/dashboard",
    allowed: ["admin", "user", "artist"],
  },
  {
    icon: "users",
    name: "Users",
    path: "", // "/dashboard/users"
    allowed: ["admin"],
    submenu: [
      {
        name: "Users List",
        path: ROUTES_PATHS.PROTECTED.DASHBOARD.USER.LIST,
        allowed: ["admin"],
      },
      {
        name: "Create User",
        path: ROUTES_PATHS.PROTECTED.DASHBOARD.USER.MANAGE("new"),
        allowed: ["admin"],
      },
    ],
  },
  {
    icon: "box",
    name: "Categories",
    path: "", // "/dashboard/categories"
    allowed: ["admin"],
    submenu: [
      {
        name: "Categories List",
        path: ROUTES_PATHS.PROTECTED.DASHBOARD.CATEGORY.LIST,
        allowed: ["admin"],
      },
      {
        name: "Create Category",
        path: ROUTES_PATHS.PROTECTED.DASHBOARD.CATEGORY.MANAGE("new"),
        allowed: ["admin"],
      },
    ],
  },
  {
    icon: "settings",
    name: "Settings",
    path: "/dashboard/settings",
    allowed: ["admin"],
  },
];
