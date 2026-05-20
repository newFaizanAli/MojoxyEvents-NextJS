import React, {
    type ReactNode,
    type HTMLAttributes,
    //   type TdHTMLAttributes,
    //   type ThHTMLAttributes,
} from "react";

function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(" ");
}

// Props for Table
interface TableProps extends HTMLAttributes<HTMLTableElement> {
    children: ReactNode;
    /**
     * Wrap in a rounded border + horizontal-scroll container.
     * Set false when you want to control the wrapper yourself.
     * @default true
     */
    scrollable?: boolean;
}

// Props for TableHeader
interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {
    children: ReactNode;
}

// Props for TableBody

interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
    children: ReactNode;
}
// Props for TableRow
interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
    children: ReactNode;
    /** Violet-tinted selected state. */
    selected?: boolean;
    /** Pointer cursor + hover background. */
    clickable?: boolean;
}


// Props for TableCell
interface TableCellProps {
    children: ReactNode; // Cell content
    isHeader?: boolean; // If true, renders as <th>, otherwise <td>
    className?: string; // Optional className for styling
}

// Table Component
const Table = ({ children, className, scrollable = true, ...props }: TableProps) => {
    const table = (
        <table
            className={cn("w-full border-collapse text-sm", className)}
            {...props}
        >
            {children}
        </table>
    );

    if (!scrollable) return table;

    return (
        <div className="w-full rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">{table}</div>
        </div>
    );
};

// TableHeader Component
const TableHeader = ({ children, className, ...props }: TableHeaderProps) => (
    <thead
        className={cn("bg-gray-50 border-b border-gray-200", className)}
        {...props}
    >
        {children}
    </thead>
);

// TableBody Component
const TableBody = ({ children, className, ...props }: TableBodyProps) => (
    <tbody
        className={cn("divide-y divide-gray-100 bg-white", className)}
        {...props}
    >
        {children}
    </tbody>
);


// TableRow Component
const TableRow = ({
    children,
    className,
    selected,
    clickable,
    ...props
}: TableRowProps) => (
    <tr
        className={cn(
            "transition-colors duration-100",
            selected
                ? "bg-violet-50/70"
                : "hover:bg-gray-50/60",
            clickable && "cursor-pointer",
            className
        )}
        {...props}
    >
        {children}
    </tr>
);

// TableCell Component
const TableCell: React.FC<TableCellProps> = ({
    children,
    isHeader = false,
    className,
}) => {
    const CellTag = isHeader ? "th" : "td";
    return <CellTag className={` ${className} text-gray-800 `}>{children}</CellTag>;
};

export { Table, TableHeader, TableBody, TableRow, TableCell };
