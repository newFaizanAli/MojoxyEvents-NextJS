"use client";

import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { SignupErrors } from '@/app/types';
import { authService } from '@/app/services/auth';
import { ROUTES_PATHS } from '@/app/utilities/page_routes';
import { EMAIL_REGEX } from '@/app/utilities/constents';
import { validatePassword } from '@/app/utilities/funcations';
import AuthLayout from '../AuthLayout';
import { Button, Input } from '@/app/components/ui';
import { OtpVerification } from '@/app/components/pages/auth';

const subtitleContent: { [key: string]: { subtitle: string } } = {
    user: {
        subtitle: "Start discovering and booking talented artists near you",
    },
    artist: {
        subtitle: "Join as an artist and get discovered by clients worldwide",
    },
};

// 1. Encapsulate the form logic inside a sub-component
const SignUpForm = () => {
    const [showOtpBox, setShowOtpBox] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();

    // Fallback safely to "user" if query param is null
    const roleFromQuery = searchParams.get("role") ?? "user";
    const allowedRoles = ["user", "artist"];

    // CRITICAL FIX: Ensure 'content' is NEVER undefined even if roleFromQuery is wacky during build
    const targetRole = allowedRoles.includes(roleFromQuery) ? roleFromQuery : "user";
    const content = subtitleContent[targetRole];

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: targetRole,
        phone: "",
        isActive: true
    });

    const [errors, setErrors] = useState<SignupErrors>({});

    const validateForm = () => {
        const newErrors: SignupErrors = {};
        if (!formData.name.trim()) newErrors.name = "Full Name is required.";
        if (!formData.email) {
            newErrors.email = "Email address is required.";
        } else if (!EMAIL_REGEX.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }
        const { valid, message } = validatePassword(formData.password);
        if (!valid) newErrors.password = message;
        else if (!formData.phone.trim()) newErrors.phone = "Phone no is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        setShowOtpBox(true);
    };

    const handleOtpVerified = async () => {
        try {
            const res = await authService.signup(
                formData.name,
                formData.email,
                formData.password,
                formData.role as string,
                formData.phone
            );

            if (res?.success && res.success === true) {
                window.location.href = ROUTES_PATHS?.PUBLIC?.HOME;
            } else {
                setErrors({ form: "Something went wrong during sign up." });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const currentRole = searchParams.get("role");
        if (!currentRole || !allowedRoles.includes(currentRole)) {
            router.replace(ROUTES_PATHS.AUTH.SIGN_IN);
        }
    }, [searchParams, router]);

    return (
        <AuthLayout title="Create account" subtitle={content.subtitle}>
            {showOtpBox ? (
                <OtpVerification
                    email={formData.email}
                    action="signup"
                    onVerified={handleOtpVerified}
                    isResend={true}
                    onCancel={() => setShowOtpBox(false)}
                />
            ) : (
                <form onSubmit={handleSubmit}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        <Input
                            name="name" label="Name" type="text"
                            placeholder="John Doe" icon="user" value={formData.name}
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            required
                        />
                        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}

                        <Input
                            name="email" label="Email" type="email"
                            placeholder="you@example.com" icon="mail" value={formData.email}
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            required
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}

                        <Input
                            name="phone" label="Phone" type="phone"
                            placeholder="+92 456 7890000" icon="phone" value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            required
                        />
                        {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}

                        <Input
                            name="password" label="Password" type="password" placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                            required
                        />
                        {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}

                        <Button type="submit" fullWidth size="lg">
                            Create Account
                        </Button>
                    </div>
                </form>
            )}

            <p className='mt-6' style={{ textAlign: "center", fontSize: 14, color: "var(--gray-500)" }}>
                Already have an account?{" "}
                <Link href={ROUTES_PATHS.AUTH.SIGN_IN} style={{ color: "var(--primary)", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>
                    Sign in
                </Link>
            </p>
        </AuthLayout>
    );
};

// 2. Main Page default export wrapped safely in a Suspense Boundary
export default function SignUpPage() {
    return (
        <Suspense fallback={<div style={{ textAlign: "center", padding: "2rem" }}>Loading...</div>}>
            <SignUpForm />
        </Suspense>
    );
}