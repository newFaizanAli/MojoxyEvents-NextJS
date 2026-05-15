"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { authService } from '@/app/services/auth';
import { toastError, toastSuccess } from '@/app/utilities/toast_utils';
import AuthLayout from '../AuthLayout';
import { Button, Input } from '@/app/components/ui';
import { OtpVerification } from '@/app/components/pages/auth';
import { ROUTES_PATHS } from '@/app/utilities/page_routes';

const ForgotPasswordPage = () => {

    const [email, setEmail] = useState("");
    const [showOtpBox, setShowOtpBox] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const cancelVerification = () => {
        setShowOtpBox(false);
        setEmail("");
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setLoading(true);

            const res = await authService.generateOTP(email, "reset");

            if (res.success) {
                toastSuccess(res.message || "OTP sent to email");
                setShowOtpBox(true);
            }

        } catch {
            toastError("Failed to send OTP");
        } finally {
            setLoading(false);
        }
    };

    const handleVerify = async (token?: string) => {
        try {
            if (token) {
                router.push(ROUTES_PATHS.AUTH.RESET_PASSWORD(token))
                return;
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <AuthLayout title="Forgot Password" subtitle="Enter your email address to reset your password">
            <div className="flex flex-col gap-8">
                {showOtpBox ?
                    <OtpVerification
                        email={email}
                        action="reset"
                        showSendBtn={false}
                        onVerified={handleVerify}
                        isResend={true}
                        onCancel={cancelVerification}
                    /> :
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <Input
                            name="email"
                            label="Email Address"
                            type="email"
                            icon="mail"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Button fullWidth size="lg" type="submit">
                            {loading ? "Sending..." : "Send Reset Link"}
                        </Button>
                    </form>
                }
            </div>
        </AuthLayout>
    );
}

export default ForgotPasswordPage
