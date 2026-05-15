"use client";

import { useEffect, useState } from "react";
import { authService } from "@/app/services/auth";
import { toastError, toastSuccess } from "@/app/utilities/toast_utils";
import { Button, Input } from "../../ui";
import { OTPEXPIRETIME } from "@/app/utilities/constents";


interface OtpVerificationProps {
    email: string;
    action: "signup" | "reset";
    showSendBtn?: boolean;
    onVerified: (token?: string) => void;
    isResend?: boolean;
    onCancel: () => void;
}


const OtpVerification = ({
    email,
    action,
    showSendBtn = true,
    onVerified,
    onCancel,
}: OtpVerificationProps) => {

    const [otp, setOtp] = useState("");
    const [generatedOtp, setGeneratedOtp] = useState<string | null>(null);
    const [otpTime, setOtpTime] = useState<number | null>(null);
    const [countdown, setCountdown] = useState(OTPEXPIRETIME);
    const [isOtpExpired, setIsOtpExpired] = useState(false);

    const handleGenerateOTP = async () => {
        try {
            const res = await authService.generateOTP(email, action);
            if (res.error) return toastError(res.message);
            toastSuccess("OTP sent to your email.");
            setGeneratedOtp(res.otp);
            setOtpTime(Date.now());
            setCountdown(OTPEXPIRETIME);
            setIsOtpExpired(false);
        } catch {
            toastError("Failed to send OTP.");
        }
    };

    const handleVerifyOTP = async () => {
        try {
            const res = await authService.verifyOTP(email, otp, action);

            if (res.success) {
                onVerified(res.token); // notify parent
            } else {
                toastError(res.message || "OTP verification failed.");
            }
        } catch {
            toastError("OTP verification failed.");
        }
    };

    useEffect(() => {
        if (otpTime) {
            const interval = setInterval(() => {
                const elapsed = Math.floor((Date.now() - otpTime) / 1000);
                const remaining = Math.max(OTPEXPIRETIME - elapsed, 0);
                setCountdown(remaining);

                if (remaining === 0) {
                    clearInterval(interval);
                    setIsOtpExpired(true);
                }
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [otpTime]);

    return (
        <div className="flex flex-col gap-5">

            {/* OTP Input + Verify */}
            <div className="space-y-3">
                <Input
                    name="otp"
                    label="OTP Verification"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />

                <Button
                    type="button"
                    fullWidth
                    size="md"
                    variant="indigo"
                    onClick={handleVerifyOTP}
                >
                    Verify OTP
                </Button>
            </div>

            {/* Initial Actions */}
            <div className="flex gap-3">
                {!generatedOtp && showSendBtn && (

                    <Button
                        type="button"
                        variant="indigo"
                        fullWidth
                        size="md"
                        onClick={handleGenerateOTP}
                    >
                        Send OTP
                    </Button>
                )}

                {!generatedOtp && (

                    <Button
                        type="button"
                        variant="outline"
                        fullWidth
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                )}


            </div>

            {/* Countdown */}
            {generatedOtp && !isOtpExpired && (
                <div className="rounded-xl bg-yellow-50 border border-yellow-200 px-4 py-3 text-sm">
                    <p className="text-gray-700">
                        OTP expires in{" "}
                        <span className="font-semibold text-red-500">
                            {countdown}s
                        </span>
                    </p>
                </div>
            )}

            {/* Expired State */}
            {isOtpExpired && (
                <div className="flex items-center justify-between rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                    <p className="text-sm text-red-500 font-medium">
                        OTP expired
                    </p>

                    <Button
                        variant="outline"
                        onClick={handleGenerateOTP}
                        type="button"
                        size="sm"
                    >
                        Resend OTP
                    </Button>
                </div>
            )}
        </div>

    )
}

export default OtpVerification
