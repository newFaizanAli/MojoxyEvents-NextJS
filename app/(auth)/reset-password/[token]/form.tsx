"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { authService } from '@/app/services/auth';
import { toastError, toastSuccess } from '@/app/utilities/toast_utils';
import { ROUTES_PATHS } from '@/app/utilities/page_routes';
import { Button, Input } from '@/app/components/ui'


export default function ResetPasswordForm({ token }: {
    token: string
}) {

    const [password, setPassword] = useState("");
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (!token || !password) return

            const res = await authService.resetPassword(token!, password);

            if (res.success) {
                toastSuccess(res.message || "Password changed");
                router.push(ROUTES_PATHS.AUTH.SIGN_IN);
            }

        } catch {
            toastError("Failed to reset password");
            router.push(ROUTES_PATHS.PUBLIC.HOME);
        }
    };

    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            <Input
                name="password"
                label="Password*"
                placeholder="••••••••"
                type="password"
                icon="lock"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
            />
            <Button type="submit" fullWidth size="lg">
                Reset Password
            </Button>
        </form>
    )
}


