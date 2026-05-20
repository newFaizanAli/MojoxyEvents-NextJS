"use client";

import { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { User } from '@/app/types';
import { useUserStore } from '@/app/store/user';
import { ROUTES_PATHS } from '@/app/utilities/page_routes';
import { TopContent } from '@/app/components/shared';
import { Button, Input, RadioGroup, Switch } from '@/app/components/ui';
import { SkeletonForm } from '@/app/components/ui/Skeleton';

// Moved out of component scope to preserve reference equality across renders
const DEFAULT_VALUES: User = {
    name: "",
    email: "",
    role: "user",
    phone: "",
    isActive: true,
    password: "*System12345",
};

const ROLE_OPTIONS = [
    { value: "admin", label: "Admin", description: "Full system access" },
    { value: "subadmin", label: "Sub Admin", description: "Partial administrative access" },
    { value: "user", label: "User", description: "Limited access" },
    { value: "artist", label: "Artist", description: "Creative content access" },
];
export default function UserPage() {
    const router = useRouter();
    const { id } = useParams<{ id: string }>();

    const isEdit = id !== "new";
    const [isLoading, setIsLoading] = useState(isEdit);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { fetchUserById, addUser, updateUser } = useUserStore();

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm<User>({
        defaultValues: DEFAULT_VALUES
    });

    // Dynamic metadata computed cleanly
    const meta = useMemo(() => ({
        title: `${isEdit ? 'Edit' : 'Add'} User Information`,
        description: isEdit
            ? "Update user details to keep your records accurate."
            : "Fill out the form below to create a new user profile.",
        submitText: isEdit ? "Update User" : "Save User"
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
                const data = await fetchUserById(id);
                if (isMounted && data) {
                    reset({
                        ...DEFAULT_VALUES,
                        ...data,
                    });
                }
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            } finally {
                if (isMounted) setIsLoading(false);
            }
        };

        loadUser();

        return () => {
            isMounted = false;
        };
    }, [id, isEdit, reset, fetchUserById]);

    const onSubmit = async (data: User) => {
        setIsSubmitting(true);
        try {
            const payload: Omit<User, "_id"> = { ...data };

            if (isEdit) {
                await updateUser(data._id!, payload);
                router.push(ROUTES_PATHS.PROTECTED.DASHBOARD.USER.LIST);
            } else {
                await addUser(payload);
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
                        label="Full Name"
                        type="text"
                        placeholder="John Doe"
                        icon="user"
                        {...register("name", { required: "Name is required" })}
                        error={errors.name?.message}
                    />

                    <Input
                        label="Phone Number"
                        type="tel"
                        placeholder="+92 300 1234567"
                        {...register("phone")}
                        error={errors.phone?.message}
                    />

                    <div className="space-y-1">
                        <Input
                            label="Email Address"
                            type="email"
                            placeholder="user@example.com"
                            icon="mail"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Please enter a valid email address"
                                }
                            })}
                            error={errors.email?.message}
                        />
                        {!isEdit && (
                            <p className="text-xs text-gray-400 pl-1">
                                Default assigned: <code className="bg-gray-50 px-1 py-0.5 rounded border text-gray-500 font-mono">*System12345</code>
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Controller
                            name="role"
                            control={control}
                            rules={{ required: "Role selection is required" }}
                            render={({ field }) => (
                                <RadioGroup
                                    label="System Role"
                                    options={ROLE_OPTIONS}
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                        {errors.role && (
                            <p className="text-red-500 text-xs pl-1 font-medium">{errors.role.message}</p>
                        )}
                    </div>

                    <div className="md:col-span-2 pt-2 border-t border-gray-50">
                        <Controller
                            name="isActive"
                            control={control}
                            render={({ field }) => (
                                <div className="flex flex-col space-y-1">
                                    <Switch
                                        label="Account Access Status"
                                        checked={field.value}
                                        onChange={field.onChange}
                                    />
                                    <p className="text-xs text-gray-500 pl-1">
                                        {field.value
                                            ? "Active — User can authenticate and interact with internal operations."
                                            : "Deactivated — User session access is completely revoked."}
                                    </p>
                                </div>
                            )}
                        />
                    </div>
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