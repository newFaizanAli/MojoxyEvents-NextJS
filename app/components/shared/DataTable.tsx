"use client"
import { useRouter } from "next/navigation";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/Table";
import { H3 } from "./Typography";
import { Button } from "../ui";

interface Column<T> {
    title: string;
    render: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
    title: string;
    addPath: string;
    data: T[];
    searchFields?: React.ReactNode;
    columns: Column<T>[];
}


function DataTable<T>({
    title,
    addPath,
    data,
    searchFields,
    columns,
}: DataTableProps<T>) {

    const safeData = Array.isArray(data) ? data : [];
    const router = useRouter();


    return (

        <div className="main">

            {/* Header */}

            <div className="flex justify-between items-center my-4 gap-4">


                <H3 useTiltNeon>{title} List</H3>

                <div className="flex items-center gap-3">

                    {/* ✅ SEARCH FIELD */}
                    {/* {enableSearch && (
                            <div className="w-64">
                                <Input
                                    placeholder={`Search ${title}...`}
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        )} */}

                    {searchFields}

                    {addPath && <Button
                        variant="primary"
                        onClick={() => (router.push(addPath))}
                    >
                        Add {title}
                    </Button>}

                </div>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <div className="max-w-full overflow-x-auto">

                    <Table>

                        {/* Head */}
                        <TableHeader className="border-b border-gray-100 text-center">
                            <TableRow>
                                {columns.map((col, i) => (
                                    <TableCell key={i} isHeader className="px-5 py-3">
                                        {col.title}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHeader>

                        {/* Body */}
                        <TableBody className="divide-y divide-gray-100 text-center">
                            {safeData?.map((row, i) => (
                                <TableRow key={i}>
                                    {columns.map((col, j) => (
                                        <TableCell key={j} className="px-4 py-3">
                                            {col.render(row)}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>

                </div>
            </div>
        </div>

    );
}

export default DataTable