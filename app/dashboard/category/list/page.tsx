"use client"
export const dynamic = "force-dynamic";
import { Suspense, useEffect, useMemo } from "react";
import { Category } from "@/app/types";
import { useCategoryStore } from "@/app/store"
import { DataTable, SearchBar } from "@/app/components/shared";
import { Button } from "@/app/components/ui";
import { useRouter, useSearchParams } from "next/navigation";
import { ROUTES_PATHS } from "@/app/utilities/page_routes";


const CategoryListContent = () => {

    const { fetchCategories, categories, deleteCategory } = useCategoryStore();

    const router = useRouter();
    const searchParams = useSearchParams();
    const search = searchParams.get("search") ?? "";

    useEffect(() => {
        fetchCategories(search);
    }, [search, fetchCategories]);

    const handleDelete = (id: string) => {
        const confirm = window.confirm("Are you sure you want to delete this category?");
        if (confirm) {
            deleteCategory(id);
        }
    }


    const columns = useMemo(
        () => [
            {
                title: "Slug",
                render: (c: Category) => c.slug,
            },
            {
                title: "Name",
                render: (c: Category) => c.name,
            },
            {
                title: "Actions",
                render: (u: Category) => (
                    <div className="flex justify-center gap-2">
                        <Button
                            size="sm"
                            variant="secondary"
                            // icon="edit"
                            onClick={() => router.push(ROUTES_PATHS.PROTECTED.DASHBOARD.CATEGORY.MANAGE(u._id!))}
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

            <DataTable<Category>
                title="Categories"
                addPath={""}
                data={categories || []}
                columns={columns}

            />
        </div>
    )

}

export default function CategoriesListPage() {
    return (
        <Suspense fallback={<div style={{ textAlign: "center", padding: "2rem" }}>Loading...</div>}>
            <CategoryListContent />
        </Suspense>
    );
}

