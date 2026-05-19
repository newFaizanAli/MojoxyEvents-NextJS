"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import Link from "next/link";
import { IconName } from "@/app/types";
import { useClickOutside } from "@/app/hooks";
import { authService } from "@/app/services/auth";
import { useUserStore } from "@/app/store/user";
import { DROPDOWN_LINKS, NAV_LINKS } from "@/app/utilities/navbar_utils";
import { ROUTES_PATHS } from "@/app/utilities/page_routes";
import { AppImage, Avatar, Icon } from "../shared";
import { Button } from "../ui";



const Navbar = () => {
    const { user } = useUserStore();
    const isAuthenticated = Boolean(user);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);

    useClickOutside(dropdownRef, () => setIsDropdownOpen(false));


    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    const userFirstName = useMemo(() => {
        return user?.name?.split(" ")[0] || "";
    }, [user]);

    const handleSignOut = async () => {

        try {
            const response = await authService.singout();
            if (response?.success) {
                window.location.href = ROUTES_PATHS?.PUBLIC?.HOME;
            }
        } catch (e) {
            console.log(e);
        }
    };

    const toggleDropdown = () => setIsDropdownOpen(prev => !prev);
    const closeDropdown = () => setIsDropdownOpen(false);


    const styles = {
        nav: {
            position: "sticky",
            top: 0,
            zIndex: 100,
            background: isScrolled ? "rgba(255,255,255,0.95)" : "var(--white)",
            backdropFilter: isScrolled ? "blur(16px)" : "none",
            borderBottom: "1px solid var(--gray-200)",
            boxShadow: isScrolled ? "var(--shadow-md)" : "none",
            transition: "all 0.3s ease",
        } as React.CSSProperties,

        container: {
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            height: 66,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        } as React.CSSProperties,

        navLinks: {
            display: "flex",
            gap: 4,
            alignItems: "center",
        } as React.CSSProperties,

        navLink: {
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "11px 16px",
            fontSize: 13,
            fontWeight: 500,
            color: "var(--gray-700)",
            textDecoration: "none",
        } as React.CSSProperties,

        userButton: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            cursor: "pointer",
            padding: "6px 10px",
            borderRadius: "var(--radius-md)",
            border: "1.5px solid var(--gray-200)",
            background: "var(--white)",
        } as React.CSSProperties,

        dropdown: {
            position: "absolute",
            right: 0,
            top: "calc(100% + 8px)",
            background: "var(--white)",
            border: "1px solid var(--gray-200)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-xl)",
            width: 200,
            overflow: "hidden",
        } as React.CSSProperties,
    };


    return (
        <nav style={styles.nav}>
            <div style={styles.container}>


                <Link href="/" aria-label="Home">
                    <AppImage
                        src="/logo-icon-black.png"
                        alt="Logo"
                        width={150}
                        height={150}
                        fill={false}
                        priority={true}
                    />
                </Link>


                <div style={styles.navLinks}>
                    {NAV_LINKS.map(({ href, label, key }) => (
                        <Link
                            key={key}
                            href={href}
                            onClick={closeDropdown}
                            style={styles.navLink}
                        >
                            {label}
                        </Link>
                    ))}
                </div>


                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

                    {isAuthenticated ? (
                        <div ref={dropdownRef} style={{ position: "relative" }}>

                            {/* TRIGGER */}
                            <div style={styles.userButton} onClick={toggleDropdown}>
                                <Avatar name={user?.name as string} size={28} />
                                <span style={{ fontSize: 13, fontWeight: 600, color: "var(--gray-800)" }}>
                                    {userFirstName}
                                </span>
                                <Icon name="chevronDown" size={14} color="var(--gray-500)" />
                            </div>

                            {/* DROPDOWN */}
                            {isDropdownOpen && (
                                <div style={styles.dropdown}>
                                    {DROPDOWN_LINKS.map(({ href, label, icon }) => (
                                        <Link
                                            key={href}
                                            href={href}
                                            onClick={closeDropdown}
                                            style={styles.navLink}
                                        >
                                            <Icon name={icon as IconName} size={15} color="var(--gray-500)" />
                                            {label}
                                        </Link>
                                    ))}

                                    <div style={{ borderTop: "1px solid var(--gray-100)", margin: "4px 0" }} />

                                    <button
                                        type="button"
                                        style={{
                                            ...styles.navLink,
                                            width: "100%",
                                            border: "none",
                                            background: "transparent",
                                            cursor: "pointer",
                                            color: "var(--error)",
                                        }}
                                        onClick={() => handleSignOut()}
                                    >
                                        <Icon name="logout" size={15} color="var(--error)" />
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link href={ROUTES_PATHS.AUTH.SIGN_IN}>
                                <Button variant="ghost" size="sm">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href={`${ROUTES_PATHS.AUTH.SIGN_UP("user")}`}>
                                <Button variant="primary" size="sm">
                                    Get Started
                                </Button>
                            </Link>

                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;