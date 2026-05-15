import { ReactNode } from "react";

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    onClick?: () => void;
}

const Card = ({ children, className = "", hover = false, onClick }: CardProps) => {
    return (
        <div
            onClick={onClick}
            className={[
                "bg-white rounded-xl border border-gray-200 overflow-hidden",
                "shadow-sm transition-all duration-250 ease-in-out",
                hover ? "hover:shadow-lg hover:-translate-y-0.75" : "",
                onClick ? "cursor-pointer" : "cursor-default",
                className,
            ].join(" ")}
        >
            {children}
        </div>
    );
};

export default Card;