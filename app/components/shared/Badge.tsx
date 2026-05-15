import { ReactNode } from "react";

interface BadgeProps {
    children: ReactNode;
    variant?: string;
    size?: string;
}

const Badge = ({ children, variant = "default", size = "sm" }: BadgeProps) => {
    const variants = {
        default: { bg: "var(--gray-100)", color: "var(--gray-700)" },
        primary: { bg: "var(--accent-soft)", color: "var(--primary)" },
        success: { bg: "#D1FAE5", color: "#065F46" },
        warning: { bg: "#FEF3C7", color: "#92400E" },
        error: { bg: "#FEE2E2", color: "#991B1B" },
        indigo: { bg: "#E0E7FF", color: "var(--indigo)" },
    };
    const v = variants[variant as keyof typeof variants] || variants.default;
    return (
        <span style={{
            display: "inline-flex", alignItems: "center", gap: 4,
            padding: size === "sm" ? "2px 10px" : "4px 14px",
            borderRadius: "var(--radius-full)",
            fontSize: size === "sm" ? 11 : 12, fontWeight: 600,
            letterSpacing: "0.03em",
            background: v.bg, color: v.color,
            animation: "badgePop 0.3s ease"
        }}>
            {children}
        </span>
    );
};

export default Badge;
