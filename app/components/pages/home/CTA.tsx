import { ROUTES_PATHS } from "@/app/utilities/page_routes"
import { Button } from "../../ui"
import { useRouter } from "next/navigation"
import Link from "next/link";
import { H2 } from "../../shared/Typography";

export default function CTA() {

    const router = useRouter();


    return <section
        className="relative py-28 px-6 md:px-18 text-center overflow-hidden"
        style={{
            background:
                "linear-gradient(135deg, var(--primary) 0%, var(--indigo) 100%)",
        }}
    >
        {/* soft glow effects */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,white,transparent_60%)]" />
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto">

            <H2 useTiltNeon className="text-white mb-4 md:text-5xl">Ready to Book or Showcase Your Talent?</H2>

            <p className="text-base md:text-lg text-white/80 mb-10">
                Whether you&apos;re planning an event or performing at one, Mojoxy connects
                you instantly with the right people.
            </p>

            {/* User / Artist info cards */}
            <div className="grid md:grid-cols-2 gap-4 mb-10 text-left">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-white">
                    <h3 className="text-lg font-semibold mb-1">For Users</h3>
                    <p className="text-sm text-white/80">
                        Discover verified artists, compare profiles, and book instantly for
                        your events.
                    </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 text-white">
                    <h3 className="text-lg font-semibold mb-1">For Artists</h3>
                    <p className="text-sm text-white/80">
                        Create your profile, get discovered, and start receiving booking
                        requests.
                    </p>
                </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col md:flex-row justify-center gap-4">
                <Button
                    size="xl"
                    variant="secondary"
                    onClick={() => router.push(ROUTES_PATHS.PUBLIC.ARTIST.LIST)}
                >
                    Browse Artists
                </Button>

                <Button
                    size="xl"
                    className="bg-white/15 text-white hover:bg-white/30 border-2 border-white/30"
                    onClick={() =>
                        router.push(ROUTES_PATHS.AUTH.SIGN_UP("user"))
                    }
                >
                    Get Started as User
                </Button>
            </div>

            {/* Artist link */}
            <div className="mt-6">
                <Link
                    href={ROUTES_PATHS.AUTH.SIGN_UP("artist")}
                    className="text-white/90 underline underline-offset-4 hover:text-white transition"
                >
                    Are you an artist? Join & start earning
                </Link>
            </div>
        </div>
    </section>
}