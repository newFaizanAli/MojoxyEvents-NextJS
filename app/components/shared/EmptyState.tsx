import { IconName } from "@/app/types";
import Icon from "./Icon";

interface EmptyStateProps {
    icon?: IconName
    title: string
    description: string
    action?: React.ReactNode
}

const EmptyState = ({ icon = "search", title, description, action }: EmptyStateProps) => (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 20px", textAlign: "center" }}>
        <div style={{ width: 72, height: 72, borderRadius: "50%", background: "var(--accent-soft)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
            <Icon name={icon} size={28} color="var(--primary)" />
        </div>
        <h3 style={{ fontSize: 18, fontWeight: 700, color: "var(--gray-800)", marginBottom: 8, fontFamily: "var(--font-display)" }}>{title}</h3>
        <p style={{ fontSize: 14, color: "var(--gray-500)", maxWidth: 300, lineHeight: 1.6, marginBottom: 20 }}>{description}</p>
        {action}
    </div>
);

export default EmptyState;