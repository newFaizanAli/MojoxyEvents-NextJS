export const SkeletonCard = () => (
    <div style={{ background: "var(--white)", borderRadius: "var(--radius-lg)", border: "1px solid var(--gray-200)", overflow: "hidden" }}>
        <div style={{ height: 200, background: "linear-gradient(90deg, var(--gray-100) 25%, var(--gray-200) 50%, var(--gray-100) 75%)", backgroundSize: "1000px 100%", animation: "shimmer 1.5s infinite" }} />
        <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
            {[80, 60, 40].map((w, i) => (
                <div key={i} style={{ height: 12, width: `${w}%`, borderRadius: 4, background: "linear-gradient(90deg, var(--gray-100) 25%, var(--gray-200) 50%, var(--gray-100) 75%)", backgroundSize: "1000px 100%", animation: "shimmer 1.5s infinite" }} />
            ))}
        </div>
    </div>
);


export const SkeletonForm = () => {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6 animate-pulse">
            <div className="h-12 bg-gray-200 rounded-md w-1/3 unique-loader-header" />
            <div className="h-4 bg-gray-200 rounded-md w-1/2" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                <div className="h-14 bg-gray-200 rounded-md" />
                <div className="h-14 bg-gray-200 rounded-md" />
                <div className="h-14 bg-gray-200 rounded-md" />
                <div className="h-28 bg-gray-200 rounded-md" />
            </div>
        </div>
    );
}

