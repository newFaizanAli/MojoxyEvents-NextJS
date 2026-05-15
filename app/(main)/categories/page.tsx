"use client"
import { useEffect } from "react";
import Link from "next/link";
import { useCategoryStore } from "@/app/store";
import { ROUTES_PATHS } from "@/app/utilities/page_routes";
import { CategoryCard } from "@/app/components/pages/category";
import { Button } from "@/app/components/ui";
import { H1 } from "@/app/components/shared/Typography";



const CategoriesPage = () => {
    const { categories, fetchCategories } = useCategoryStore();

    useEffect(() => {
        fetchCategories();
    }, [])


    return (
        <div className="max-w-275 mx-auto py-12 px-6 text-center">
            <div className="space-y-2 mb-8" >
                <H1 useTiltNeon >Explore Categories</H1>
                <p className="text-lg text-gray-500">Find the perfect genre for your event</p>
            </div>
            <div className="grid grid-cols-3 gap-6 mb-12 space-y-2">
                {categories.map((cat, idx) =>
                    <Link href={ROUTES_PATHS.PUBLIC.ARTIST.LIST + `?category=${cat._id}`} key={idx}>
                        <CategoryCard category={cat} />
                    </Link>
                )}
            </div>
            <div>
                <Link href={ROUTES_PATHS.PUBLIC.ARTIST.LIST}>
                    <Button size="lg">Browse All Artists</Button>
                </Link>
            </div>
        </div>
    )
};

export default CategoriesPage