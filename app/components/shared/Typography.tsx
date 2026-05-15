import { tilt_neon } from "@/app/lib/fonts";
import clsx from "clsx";

type HeadingProps = {
    children: React.ReactNode;
    useTiltNeon?: boolean;
    className?: string;
};

export function H1({
    children,
    useTiltNeon = false,
    className,
}: HeadingProps) {
    return (
        <h1
            className={clsx(
                "text-5xl font-extrabold tracking-tight text-gray-900",
                useTiltNeon && tilt_neon.className,
                className
            )}
        >
            {children}
        </h1>
    );
}

export function H2({
    children,
    useTiltNeon = false,
    className,
}: HeadingProps) {
    return (
        <h2
            className={clsx(
                "text-4xl font-extrabold text-gray-900",
                useTiltNeon && tilt_neon.className,
                className
            )}
        >
            {children}
        </h2>
    );
}

export function H3({
    children,
    useTiltNeon = false,
    className,
}: HeadingProps) {
    return (
        <h3
            className={clsx(
                "text-2xl font-medium text-gray-800",
                useTiltNeon && tilt_neon.className,
                className
            )}
        >
            {children}
        </h3>
    );
}