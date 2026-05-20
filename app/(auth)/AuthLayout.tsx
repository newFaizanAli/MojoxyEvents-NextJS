import { AppImage, Icon } from "@/app/components/shared";
import Link from "next/link";
import { H2 } from "../components/shared/Typography";

interface AuthProps {
    children: React.ReactNode
    title: string
    subtitle: string
}
export default function AuthLayout({ children, title, subtitle }: Readonly<AuthProps>) {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            {/* LEFT PANEL */}
            <div className="relative flex flex-col items-center justify-center overflow-hidden px-6 py-16 lg:p-16 bg-[linear-gradient(135deg,#0D0020_0%,#1A0040_60%,#0A1060_100%)]">

                {/* Glow background */}
                <div className="absolute top-1/4 left-1/3 w-72 h-72 rounded-full blur-3xl bg-[radial-gradient(circle,rgba(124,58,237,0.2)_0%,transparent_70%)]" />

                <div className="relative text-center">
                    {/* Logo */}
                    <Link href="/" className="inline-flex justify-center">
                        <AppImage
                            src="/logo-icon-white.png"
                            alt="Logo"
                            width={200}
                            height={200}
                            fill={false}
                        />
                    </Link>

                    {/* Heading */}


                    <H2 useTiltNeon className="text-white font-extrabold text-2xl sm:text-3xl lg:text-4xl"> Book the world’s best artists</H2>

                    {/* Subtitle */}
                    <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-white/60 max-w-md mx-auto">
                        Join thousands of event planners who trust Mojoxy for unforgettable performances.
                    </p>

                    {/* Features */}
                    <div className="mt-10 flex flex-col gap-3 text-left">
                        {[
                            "500+ verified artists",
                            "Secure instant booking",
                            "24/7 customer support",
                        ].map((item) => (
                            <div key={item} className="flex items-center gap-3">
                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-purple-500/20">
                                    <Icon name="check" size={12} color="#A78BFA" />
                                </div>
                                <span className="text-sm text-white/80">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="flex items-center justify-center bg-white px-6 py-12 lg:p-16">
                <div className="w-full max-w-md">
                    <div className="mb-8">

                        <H2 useTiltNeon className="text-2xl sm:text-3xl font-extrabold mb-2">{title}</H2>
                        <p className="text-sm text-gray-500">{subtitle}</p>
                    </div>

                    {children}
                </div>
            </div>
        </div>
    );
}