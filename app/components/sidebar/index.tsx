"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { IconName } from "@/app/types";
import { Avatar, Icon } from "../shared";
import { useUserStore } from "@/app/store/user";
import { sidebar_links } from "@/app/utilities/sidebar";

const DashboardSidebar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const { user } = useUserStore();

    const [openMenus, setOpenMenus] = useState<string[]>([]);

    const role = user?.role || "user";

    const toggleMenu = (name: string) => {
        setOpenMenus((prev) =>
            prev.includes(name)
                ? prev.filter((i) => i !== name)
                : [...prev, name]
        );
    };

    const isActive = (path?: string) => {
        if (!path) return false;

        // exact dashboard root match
        if (path === "/dashboard") {
            return pathname === "/dashboard";
        }

        // nested routes
        return pathname.startsWith(path);
    };
    const filteredLinks = sidebar_links.filter((link) =>
        link.allowed.includes(role)
    );

    return (
        <aside className="w-60 h-screen bg-white border-r border-gray-200 flex flex-col sticky top-0">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <Avatar name={user?.name || "User"} size={42} ring />

                    <div className="overflow-hidden">
                        <div className="text-sm font-bold text-gray-900 truncate">
                            {user?.name || "John Doe"}
                        </div>

                        <div className="text-xs text-gray-500 capitalize">
                            {role}
                        </div>
                    </div>
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-2 flex flex-col gap-1 overflow-y-auto">
                {filteredLinks.map((item) => {
                    const hasSubmenu = item.submenu?.length;

                    // MAIN ACTIVE
                    const active =
                        isActive(item.path) ||
                        item.submenu?.some((s) => isActive(s.path));


                    if (!hasSubmenu) {
                        return (
                            <button
                                key={item.name}
                                onClick={() => item.path && router.push(item.path)}
                                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition w-full text-left
                  ${active
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                {item.icon && (
                                    <Icon
                                        name={item.icon as IconName}
                                        size={17}
                                        color={
                                            active
                                                ? "var(--primary)"
                                                : "var(--gray-500)"
                                        }
                                    />
                                )}

                                <span>{item.name}</span>
                            </button>
                        );
                    }


                    return (
                        <div key={item.name}>
                            <button
                                onClick={() => toggleMenu(item.name)}
                                className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition w-full text-left
                  ${active
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-gray-600 hover:bg-gray-50"
                                    }`}
                            >
                                {item.icon && (
                                    <Icon
                                        name={item.icon as IconName}
                                        size={17}
                                        color={
                                            active
                                                ? "var(--primary)"
                                                : "var(--gray-500)"
                                        }
                                    />
                                )}

                                <span className="flex-1">{item.name}</span>

                                <span className="text-xs">
                                    {openMenus.includes(item.name) ? "−" : "+"}
                                </span>
                            </button>

                            {openMenus.includes(item.name) && (
                                <div className="ml-6 mt-1 flex flex-col gap-1">
                                    {item.submenu
                                        ?.filter((sub) => sub.allowed.includes(role))
                                        .map((sub) => {
                                            const subActive = isActive(sub.path);

                                            return (
                                                <button
                                                    key={sub.name}
                                                    onClick={() =>
                                                        sub.path && router.push(sub.path)
                                                    }
                                                    className={`px-3 py-2 rounded-md text-sm text-left transition
                            ${subActive
                                                            ? "bg-blue-50 text-blue-600"
                                                            : "text-gray-600 hover:bg-gray-50"
                                                        }`}
                                                >
                                                    {sub.name}
                                                </button>
                                            );
                                        })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="p-2 border-t border-gray-100">
                <button
                    className="flex items-center gap-3 px-3 py-2 w-full text-sm text-gray-600 hover:bg-gray-50 rounded-md"
                    onClick={() => router.push("/")}
                >
                    <Icon
                        name="home"
                        size={17}
                        color="var(--gray-400)"
                    />

                    Back to Site
                </button>
            </div>
        </aside>
    );
};

export default DashboardSidebar;