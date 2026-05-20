"use client"
export const dynamic = "force-dynamic";
import { Suspense, useEffect, useMemo } from "react";
import { User } from "@/app/types";
import { useUserStore } from "@/app/store/user"
import { Badge, DataTable, SearchBar } from "@/app/components/shared";
import { Button } from "@/app/components/ui";
import { useRouter, useSearchParams } from "next/navigation";
import { ROUTES_PATHS } from "@/app/utilities/page_routes";


const UsersListContent = () => {

    const { fetchUsers, users, deleteUser } = useUserStore();

    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get("search") ?? "";


    useEffect(() => {
        fetchUsers(search);
    }, [search, fetchUsers]);

    const handleDelete = (id: string) => {
        const confirm = window.confirm("Are you sure you want to delete this user?");
        if (confirm) {
            deleteUser(id);
        }
    }


    const columns = useMemo(
        () => [
            {
                title: "User",
                render: (u: User) => (
                    <div>
                        <span className="block font-medium text-gray-800">{u.name}</span>
                        <span className="block text-xs text-gray-500">{u.role}</span>
                    </div>
                ),
            },
            {
                title: "Email",
                render: (u: User) => u.email,
            },
            {
                title: "Phone",
                render: (u: User) => u.phone || "-",
            },
            {
                title: "Status",
                render: (u: User) => (
                    <Badge size="sm" variant={u.isActive ? "success" : "error"} >
                        {u.isActive ? "Active" : "Blocked"}
                    </Badge>
                ),
            },
            {
                title: "Actions",
                render: (u: User) => (
                    <div className="flex justify-center gap-2">
                        <Button
                            size="sm"
                            variant="secondary"
                            // icon="edit"
                            onClick={() => router.push(ROUTES_PATHS.PROTECTED.DASHBOARD.USER.MANAGE(u._id!))}
                        >
                            {/* <PencilIcon className="h-4 w-4 me-2" /> */}
                            Edit
                        </Button>

                        <Button
                            size="sm"
                            variant="danger"
                            icon="trash"
                            onClick={() => handleDelete(u._id!)}
                        >
                            {/* <TrashBinIcon className="h-4 w-4" /> */}
                            Delete
                        </Button>
                    </div>
                ),
            },
        ],
        []
    );


    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>

            <DataTable<User>
                title="Users"
                addPath={""}
                data={users || []}
                columns={columns}
                searchFields={
                    <SearchBar
                        placeholder="Search users..."
                        onSearch={(value) => {
                            const params = new URLSearchParams(searchParams.toString());

                            if (value) {
                                params.set("search", value);
                            } else {
                                params.delete("search");
                            }

                            router.push(`?${params.toString()}`);
                        }}

                    />
                }
            />
        </div>
    )

}

export default function UsersListPage() {
    return (
        <Suspense fallback={<div style={{ textAlign: "center", padding: "2rem" }}>Loading...</div>}>
            <UsersListContent />
        </Suspense>
    );
}

