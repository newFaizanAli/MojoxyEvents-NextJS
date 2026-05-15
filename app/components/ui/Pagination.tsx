import { Icon } from "../shared";

interface PaginationProps {
    current: number;
    total: number;
    onChange: (page: number) => void;
}

const Pagination = ({ current = 1, total = 10, onChange }: PaginationProps) => {
    const pages = Array.from({ length: Math.min(total, 5) }, (_, i) => i + 1);
    return (
        <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center", padding: "20px 0" }}>
            <button onClick={() => onChange(current - 1)} disabled={current === 1} style={{ width: 36, height: 36, borderRadius: "var(--radius-md)", border: "1.5px solid var(--gray-200)", background: "var(--white)", cursor: current === 1 ? "not-allowed" : "pointer", opacity: current === 1 ? 0.4 : 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="chevronRight" size={14} style={{ transform: "rotate(180deg)" }} />
            </button>
            {pages.map(p => (
                <button key={p} onClick={() => onChange(p)} style={{ width: 36, height: 36, borderRadius: "var(--radius-md)", border: p === current ? "none" : "1.5px solid var(--gray-200)", background: p === current ? "var(--primary)" : "var(--white)", color: p === current ? "var(--white)" : "var(--gray-700)", fontWeight: p === current ? 700 : 500, fontSize: 14, cursor: "pointer" }}>
                    {p}
                </button>
            ))}
            <button onClick={() => onChange(current + 1)} disabled={current === total} style={{ width: 36, height: 36, borderRadius: "var(--radius-md)", border: "1.5px solid var(--gray-200)", background: "var(--white)", cursor: current === total ? "not-allowed" : "pointer", opacity: current === total ? 0.4 : 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="chevronRight" size={14} />
            </button>
        </div>
    );
};

export default Pagination;