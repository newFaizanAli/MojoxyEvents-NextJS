import DashboardSidebar from "../components/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-gray-500">
            <DashboardSidebar />
            <main className="flex-1 bg-gray-50 overflow-y-auto">
                {children}
            </main>
        </div>
    );
}