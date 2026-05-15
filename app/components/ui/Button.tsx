import { ReactNode } from "react";
import { IconName } from "@/app/types";
import { Icon } from "../shared";

interface ButtonProps {
    children: ReactNode;
    variant?: "primary" | "secondary" | "ghost" | "danger" | "indigo" | "outline";
    type?: "button" | "submit" | "reset";
    size?: string;
    icon?: IconName;
    onClick?: () => void;
    disabled?: boolean;
    fullWidth?: boolean;
    className?: string;
}

const variantClasses: Record<string, string> = {
    primary: "bg-violet-600 hover:bg-violet-700 text-white border-transparent shadow-[0_4px_14px_rgba(124,58,237,0.25)] hover:shadow-[0_8px_20px_rgba(124,58,237,0.35)]",
    secondary: "bg-white hover:bg-gray-100 text-gray-800 border border-gray-200 shadow-sm",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700 border-transparent shadow-none",
    danger: "bg-red-500 hover:bg-red-600 text-white border-transparent shadow-[0_4px_12px_rgba(239,68,68,0.2)]",
    indigo: "bg-indigo-600 hover:bg-indigo-700 text-white border-transparent shadow-[0_8px_20px_rgba(79,70,229,0.3)]",
    outline: "bg-transparent hover:bg-violet-50 text-violet-600 border border-violet-600 shadow-none",
};

const sizeClasses: Record<string, string> = {
    sm: "px-3.5 py-1.5 text-xs gap-1",
    md: "px-5 py-2.5 text-sm gap-1.5",
    lg: "px-7 py-3 text-[15px] gap-2",
    xl: "px-9 py-4 text-base gap-2",
};

const iconSizes: Record<string, number> = { sm: 14, md: 16, lg: 17, xl: 18 };

const Button = ({
    children,
    variant = "primary",
    type = "button",
    size = "md",
    icon,
    onClick,
    disabled,
    fullWidth,
    className = "",
}: ButtonProps) => {
    const vClass = variantClasses[variant] ?? variantClasses.primary;
    const sClass = sizeClasses[size] ?? sizeClasses.md;
    const iconSize = iconSizes[size] ?? 16;

    return (
        <button
            onClick={onClick}
            type={type}
            disabled={disabled}
            className={[
                "inline-flex items-center justify-center",
                "font-semibold rounded-lg tracking-wide",
                "border transition-all duration-200 ease-in-out",
                vClass,
                sClass,
                fullWidth ? "w-full" : "w-auto",
                disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
                className,
            ].join(" ")}
        >
            {icon && <Icon name={icon as IconName} size={iconSize} />}
            {children}
        </button>
    );
};

export default Button;