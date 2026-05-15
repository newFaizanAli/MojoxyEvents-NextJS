const SkeletonCard = () => (
    <div style={{ background: "var(--white)", borderRadius: "var(--radius-lg)", border: "1px solid var(--gray-200)", overflow: "hidden" }}>
        <div style={{ height: 200, background: "linear-gradient(90deg, var(--gray-100) 25%, var(--gray-200) 50%, var(--gray-100) 75%)", backgroundSize: "1000px 100%", animation: "shimmer 1.5s infinite" }} />
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            {[80, 60, 40].map((w, i) => (
                <div key={i} style={{ height: 12, width: `${w}%`, borderRadius: 4, background: "linear-gradient(90deg, var(--gray-100) 25%, var(--gray-200) 50%, var(--gray-100) 75%)", backgroundSize: "1000px 100%", animation: "shimmer 1.5s infinite" }} />
            ))}
        </div>
    </div>
);

export default SkeletonCard;