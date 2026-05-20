"use client";

import { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { Category, CategoryGenre } from '@/app/types';
import { useCategoryStore } from '@/app/store';
import { ROUTES_PATHS } from '@/app/utilities/page_routes';
import { TopContent } from '@/app/components/shared';
import { Button, Input, ImageUpload, TextArea } from '@/app/components/ui';
import { SkeletonForm } from '@/app/components/ui/Skeleton';
import { ARTIST_GENRES } from '@/app/utilities/category';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/app/components/ui/Table';

// Moved out of component scope to preserve reference equality across renders
const DEFAULT_VALUES: Category =
    { name: "", slug: "", description: "", img_link: "" as unknown as File | '', genres: [] };



export default function UserPage() {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();

    const isEdit = id !== "new";
    const [isLoading, setIsLoading] = useState(isEdit);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [categGenre, setCategGenres] = useState<CategoryGenre[]>([]);

    const { fetchCategoryById, addCategory, updateCategory } = useCategoryStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
        setValue,
    } = useForm<Category>({
        defaultValues: DEFAULT_VALUES
    });

    // Dynamic metadata computed cleanly
    const meta = useMemo(() => ({
        title: `${isEdit ? 'Edit' : 'Add'} Category`,
        description: isEdit
            ? "Update user details to keep your records accurate."
            : "Fill out the form below to create a new user profile.",
        submitText: isEdit ? "Update category" : "Save category"
    }), [isEdit]);

    useEffect(() => {
        if (!id || !isEdit) {
            reset(DEFAULT_VALUES);
            return;
        }

        let isMounted = true;

        const loadUser = async () => {
            setIsLoading(true);
            try {
                const data = await fetchCategoryById(id);
                if (isMounted && data) {


                    reset({
                        ...DEFAULT_VALUES,
                        ...data,
                    });


                    const mappedGenres = (data.genres || []).map(item => {
                        const match = ARTIST_GENRES.find(g => g.value === item.genre);
                        return { genre: item.genre, name: match?.label || item.genre };
                    });
                    setCategGenres(mappedGenres);
                }
            } catch (error) {
                console.error("Failed to fetch category data:", error);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        loadUser();

        return () => {
            isMounted = false;
        };
    }, [id, isEdit, reset, fetchCategoryById]);

    const handleAddGenre = (genreId: string) => {
        if (categGenre.some(g => g.genre === genreId)) return;
        const genre = ARTIST_GENRES.find(g => g.value === genreId);
        if (!genre) return;
        setCategGenres([...categGenre, { genre: genre.value!, name: genre.label }]);
    };

    const handleRemoveGenre = (index: number) => setCategGenres(categGenre.filter((_, i) => i !== index));

    const onSubmit = async (data: Category) => {

        setIsSubmitting(true);

        try {
            const payload: Omit<Category, "_id"> = { ...data, genres: categGenre };

            if (isEdit) {
                await updateCategory(data._id!, payload);
                router.push(ROUTES_PATHS.PROTECTED.DASHBOARD.CATEGORY.LIST);
            } else {
                await addCategory(payload);
                reset(DEFAULT_VALUES);
            }
        } catch (error) {
            console.error("Error processing form submission:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Modern, layout-stable skeleton loader 
    if (isLoading) {
        return <SkeletonForm />
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <TopContent
                title={meta.title}
                description={meta.description}
            />

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">

                    <Input
                        label="Name"
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        error={errors.name?.message}
                    />

                    <Input
                        label="Slug"
                        type="text"
                        {...register("name", { required: "Name is required" })}
                        error={errors.slug?.message}
                    />

                    <Controller
                        name={"img_link"}
                        control={control}
                        render={({ field }) => (
                            <ImageUpload

                                value={field.value}
                                onChange={(file) => setValue("img_link", file, { shouldValidate: true, shouldDirty: true })}
                                error={errors.img_link?.message}
                                label={"Upload Image"}
                            />
                        )}
                    />


                    <Controller

                        name="description"
                        control={control}
                        render={({ field }) => <TextArea
                            label='Description'
                            value={field.value} onChange={field.onChange}
                            placeholder="Enter description"
                            error={errors.description?.message}
                        />
                        }
                    />
                </div>

                <div>
                    <select
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 my-3 text-white 
  focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 
  transition-all"
                        defaultValue=""
                        onChange={(e) => handleAddGenre(e.target.value)}
                    >
                        <option value="" disabled className="text-black">
                            Select Genre
                        </option>

                        {ARTIST_GENRES.map((genre) => (
                            <option
                                key={genre.value}
                                value={genre.value}
                                className="text-black"
                            >
                                {genre.label}
                            </option>
                        ))}
                    </select>

                    <Table>
                        <TableHeader className="border-b border-gray-100">
                            <TableRow>
                                <TableCell isHeader>Name</TableCell>
                                <TableCell isHeader>Action</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y space-y-3 divide-gray-100 text-center">
                            {categGenre.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>
                                        <Button variant="danger" size="sm" type="button" onClick={() => handleRemoveGenre(index)}>Remove</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="flex justify-end pt-4">
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-8 py-2.5 font-medium shadow-sm transition-all duration-200"
                    >
                        {isSubmitting ? "Processing..." : meta.submitText}
                    </Button>
                </div>
            </form>
        </div>
    );
}