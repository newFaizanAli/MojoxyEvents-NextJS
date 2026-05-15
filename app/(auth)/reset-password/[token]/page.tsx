import AuthLayout from "../../AuthLayout"
import ResetPasswordForm from "./form"

const ResetPasswordPage = async ({
    params,
}: {
    params: Promise<{ token: string }>
}) => {

    const { token } = await params

    return (
        <AuthLayout title="Reset Password" subtitle="Enter your new password">
            <div className="flex flex-col gap-8">
                <ResetPasswordForm token={token} />
            </div>
        </AuthLayout>
    )
}

export default ResetPasswordPage