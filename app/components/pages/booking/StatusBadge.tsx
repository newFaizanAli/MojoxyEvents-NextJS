import { Badge } from "../../shared";

interface StatusBadgeProps {
    status: string;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
    const map = {
        confirmed: { variant: "success", label: "Confirmed" },
        pending: { variant: "warning", label: "Pending" },
        completed: { variant: "indigo", label: "Completed" },
        cancelled: { variant: "error", label: "Cancelled" },
    };
    const m = map[status as keyof typeof map] || map.pending;
    return <Badge variant={m.variant}>{m.label}</Badge>;
};

export default StatusBadge;