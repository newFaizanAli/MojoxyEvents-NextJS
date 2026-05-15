"use client"
import { useState } from 'react'
import Link from 'next/link';
import { authService } from '@/app/services/auth';
import { ROUTES_PATHS } from '@/app/utilities/page_routes';
import { Button, Input } from '@/app/components/ui';
import AuthLayout from '../AuthLayout';
import { toastError } from '@/app/utilities/toast_utils';



const SignInPage = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<{
        email?: string;
        password?: string;
        form?: string;
    }>({});


    const validateForm = () => {
        const newErrors: { email?: string; password?: string } = {};
        if (!formData?.email) {
            newErrors.email = "Email address is required.";
        }

        if (!formData?.password) {
            newErrors.password = "Password is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        if (!validateForm()) {
            return;
        }

        try {
            const response = await authService.signin(
                formData?.email,
                formData?.password
            );

            if (!response?.success) {
                toastError(response?.message);
            }


            if (response?.success) {
                window.location.href = ROUTES_PATHS?.PUBLIC?.HOME;
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <AuthLayout title="Welcome back" subtitle="Sign in to your Mojoxy account">
            <div className="flex flex-col gap-8">
                <form className="" onSubmit={handleSubmit}>
                    <Input name="email" label="Email Address" type="email"
                        placeholder="you@example.com" icon="mail" value={formData.email}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                [e.target.name]: e.target.value,
                            })
                        } required />
                    {errors.email && (
                        <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                    )}
                    <Input name="password" label="Password" type="password" placeholder="••••••••" value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                [e.target.name]: e.target.value,
                            })
                        }
                        required />
                    {errors.password && (
                        <p className="mt-1 text-xs text-red-600">{errors.password}</p>
                    )}
                    <div className="py-5 flex justify-end">
                        <Link className='text-indigo-600 text-sm cursor-pointer font-semibold'
                            href={`${ROUTES_PATHS?.AUTH?.FORGOT_PASSWORD}`}>Forgot password?</Link>
                    </div>
                    <Button fullWidth size="lg" type="submit">Sign In</Button>
                </form>


                <p style={{ textAlign: "center", fontSize: 14, color: "var(--gray-500)" }}>
                    Dont have an account?{" "}
                    <Link href={`${ROUTES_PATHS?.AUTH?.SIGN_UP("user")}`} style={{ color: "var(--primary)", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>Sign Up</Link>
                </p>
            </div>
        </AuthLayout>
    );
}

export default SignInPage
