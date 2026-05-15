"use client";

import { Icon } from "../shared";
import type { IconName } from "@/app/types";

const FOOTER_COLUMNS = [
    {
        title: "Company",
        links: ["About", "Blog", "Contact"],
    },
    {
        title: "Resources",
        links: ["Help Center", "Privacy Policy", "Terms of Service"],
    },
    {
        title: "Social",
        links: ["Facebook", "Instagram", "Twitter"],
    },
] as const;

const SOCIAL_ICONS: IconName[] = ["globe"];

const CURRENT_YEAR = new Date().getFullYear();

const Footer = () => {
    const styles: Record<string, React.CSSProperties> = {
        footer: {
            background: "var(--gray-900)",
            color: "var(--gray-400)",
            paddingTop: 64,
            paddingBottom: 40,
        },

        container: {
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
        },

        grid: {
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr",
            gap: 48,
            marginBottom: 48,
        },

        brand: {
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 16,
        },

        logo: {
            width: 36,
            height: 36,
            borderRadius: "var(--radius-md)",
            background: "linear-gradient(135deg, var(--primary), var(--indigo))",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },

        brandName: {
            fontFamily: "var(--font-display)",
            fontSize: 20,
            fontWeight: 800,
            color: "var(--white)",
        },

        description: {
            fontSize: 14,
            lineHeight: 1.7,
            color: "var(--gray-500)",
            maxWidth: 280,
        },

        columnTitle: {
            fontSize: 13,
            fontWeight: 700,
            color: "var(--white)",
            marginBottom: 16,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
        },

        links: {
            display: "flex",
            flexDirection: "column",
            gap: 10,
        },

        link: {
            fontSize: 14,
            color: "var(--gray-400)",
            cursor: "pointer",
            transition: "color 0.15s ease",
        },

        bottom: {
            borderTop: "1px solid var(--gray-800)",
            paddingTop: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        },

        copyright: {
            fontSize: 13,
        },

        social: {
            display: "flex",
            gap: 12,
        },

        iconButton: {
            width: 34,
            height: 34,
            borderRadius: "var(--radius-sm)",
            border: "1px solid var(--gray-700)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            background: "transparent",
        },
    };

    return (
        <footer style={styles.footer}>
            <div style={styles.container}>
                <div style={styles.grid}>
                    {/* Brand */}
                    <div>
                        <div style={styles.brand}>
                            <div style={styles.logo}>
                                <Icon name="music" size={18} color="white" />
                            </div>
                            <span style={styles.brandName}>Mojoxy</span>
                        </div>

                        <p style={styles.description}>
                            The premier platform for booking world-class artists and performers for any occasion.
                        </p>
                    </div>

                    {/* Columns */}
                    {FOOTER_COLUMNS.map((col) => (
                        <div key={col.title}>
                            <h4 style={styles.columnTitle}>{col.title}</h4>

                            <div style={styles.links}>
                                {col.links.map((link) => (
                                    <span
                                        key={link}
                                        style={styles.link}
                                        onMouseEnter={(e) =>
                                            (e.currentTarget.style.color = "var(--white)")
                                        }
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.color = "var(--gray-400)")
                                        }
                                    >
                                        {link}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div style={styles.bottom}>
                    <p style={styles.copyright}>
                        © {CURRENT_YEAR} Mojoxy. All rights reserved.
                    </p>

                    <div style={styles.social}>
                        {SOCIAL_ICONS.map((icon) => (
                            <div key={icon} style={styles.iconButton}>
                                <Icon name={icon} size={15} color="var(--gray-400)" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;