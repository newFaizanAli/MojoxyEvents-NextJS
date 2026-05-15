import { getInitials } from "@/app/utilities/funcations";
import AppImage from "./AppImage";

interface AvatarProps {
    src?: string;
    name: string;
    size?: number;
    ring?: boolean;
}

const Avatar = ({ src, name, size = 40, ring = false }: AvatarProps) => {
    const initials = getInitials(name || "?");

    const baseStyles: React.CSSProperties = {
        width: size,
        height: size,
        borderRadius: "50%",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        fontSize: size * 0.4,
        fontWeight: 700,
        letterSpacing: "0.02em",
        color: "var(--white)",
        background: src
            ? "transparent"
            : "linear-gradient(135deg, var(--primary), var(--indigo))",
        border: ring ? "2px solid var(--white)" : undefined,
        boxShadow: ring ? "var(--shadow-sm)" : undefined,
        position: "relative",
    };

    return (
        <div style={baseStyles}>
            {src ? (
                <AppImage sizes={`${size}px`} src={src} alt={name} />
            ) : (
                <span>{initials}</span>
            )}
        </div>
    );
};

export default Avatar;