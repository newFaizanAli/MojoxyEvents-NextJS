import { IconName } from "@/app/types";
import { Avatar, Icon } from "../shared";

interface SidebarProps {
    page: string;
    setPage: (page: string) => void;
    user: any;
}

const DashboardSidebar = ({ page, setPage, user }: SidebarProps) => {
    const links = [
        { key: "dashboard", label: "Overview", icon: "grid" },
        { key: "my-bookings", label: "My Bookings", icon: "calendar", badge: 2 },
        { key: "favorites", label: "Favorites", icon: "heart" },
        { key: "notifications", label: "Notifications", icon: "bell", badge: 2 },
        { key: "profile", label: "My Profile", icon: "user" },
        { key: "settings", label: "Settings", icon: "settings" },
    ];
    return (
        <aside style={{ width: 240, background: "var(--white)", borderRight: "1px solid var(--gray-200)", display: "flex", flexDirection: "column", height: "100%", position: "sticky", top: 0 }}>
            <div style={{ padding: "24px 16px", borderBottom: "1px solid var(--gray-100)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <Avatar src={user?.avatar} name={user?.name || "User"} size={42} ring />
                    <div style={{ overflow: "hidden" }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--gray-900)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user?.name || "John Doe"}</div>
                        <div style={{ fontSize: 12, color: "var(--gray-500)" }}>Premium Member</div>
                    </div>
                </div>
            </div>
            <nav style={{ flex: 1, padding: "12px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
                {links.map(l => (
                    <button key={l.key} onClick={() => setPage(l.key)} style={{
                        display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
                        borderRadius: "var(--radius-md)", border: "none",
                        background: page === l.key ? "var(--accent-soft)" : "transparent",
                        color: page === l.key ? "var(--primary)" : "var(--gray-600)",
                        fontWeight: page === l.key ? 700 : 500, fontSize: 14,
                        cursor: "pointer", transition: "all 0.15s", width: "100%", textAlign: "left",
                    }}
                        onMouseEnter={e => { if (page !== l.key) e.currentTarget.style.background = "var(--gray-50)"; }}
                        onMouseLeave={e => { if (page !== l.key) e.currentTarget.style.background = "transparent"; }}
                    >
                        <Icon name={l.icon as IconName} size={17} color={page === l.key ? "var(--primary)" : "var(--gray-500)"} />
                        <span style={{ flex: 1 }}>{l.label}</span>
                        {l.badge && <span style={{ background: "var(--primary)", color: "white", borderRadius: "var(--radius-full)", fontSize: 10, fontWeight: 700, padding: "1px 7px" }}>{l.badge}</span>}
                    </button>
                ))}
            </nav>
            <div style={{ padding: "12px 8px", borderTop: "1px solid var(--gray-100)" }}>
                <button onClick={() => setPage("home")} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: "var(--radius-md)", border: "none", background: "transparent", color: "var(--gray-600)", fontSize: 14, fontWeight: 500, cursor: "pointer", width: "100%" }}>
                    <Icon name="home" size={17} color="var(--gray-400)" /> Back to Site
                </button>
            </div>
        </aside>
    );
};

export default DashboardSidebar;