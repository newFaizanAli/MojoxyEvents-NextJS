import { IconName } from "@/app/types";
import { Badge, Icon } from "@/app/components/shared";
import { H1, H2, H3 } from "@/app/components/shared/Typography";


const AboutPage = () => (
    <div>
        <section className="bg-[linear-gradient(135deg,#0D0020,#1A0040)] py-20 px-6 text-center">
            <H1 useTiltNeon className="mb-3 text-white text-6xl">About Mojoxy</H1>

            <p className="text-lg text-white/70 max-w-140 mx-auto">
                We&apos;re on a mission to make extraordinary performances accessible to everyone.
            </p>
        </section>
        <section style={{ maxWidth: 1000, margin: "0 auto", padding: "72px 24px" }}>
            <div className="grid grid-cols-2 gap-15 items-center mb-18">

                <div className="space-y-2">
                    <Badge variant="primary" size="md">Our Story</Badge>

                    <H2>Born from a love of live music</H2>

                    <p className="text-[15px] text-gray-600 leading-[1.8]">
                        Founded in 2020, Mojoxy emerged from a simple frustration — finding and booking talented artists was needlessly complex. We built the platform we always wished existed: transparent, fair, and beautifully simple.
                    </p>
                </div>

                <div className="bg-[linear-gradient(135deg,var(--primary),var(--indigo))] rounded-xl h-70 flex items-center justify-center">
                    <Icon name="music" size={80} color="rgba(255,255,255,0.3)" />
                </div>

            </div>
            <div className="grid grid-cols-3 gap-6">

                <div className="p-7 bg-gray-100 rounded-xl border border-gray-200 text-center">
                    <div className="w-14 h-14 rounded-lg bg-(--accent-soft) mx-auto mb-4 flex items-center justify-center">
                        <Icon name="users" size={24} color="var(--primary)" />
                    </div>

                    <H3 useTiltNeon>500+ Artists</H3>

                    <p className="text-sm text-gray-500 leading-[1.6]">
                        Verified, professional performers across 30+ genres.
                    </p>
                </div>

                <div className="p-7 bg-gray-100 rounded-xl border border-gray-200 text-center">
                    <div className="w-14 h-14 rounded-lg bg-(--accent-soft) mx-auto mb-4 flex items-center justify-center">
                        <Icon name="calendar" size={24} color="var(--primary)" />
                    </div>

                    <H3 useTiltNeon>10K+ Bookings</H3>

                    <p className="text-sm text-gray-500 leading-[1.6]">
                        Successfully completed events across the globe.
                    </p>
                </div>

                <div className="p-7 bg-gray-100 rounded-xl border border-gray-200 text-center">
                    <div className="w-14 h-14 rounded-lg bg-(--accent-soft) mx-auto mb-4 flex items-center justify-center">
                        <Icon name="star" size={24} color="var(--primary)" />
                    </div>

                    <H3 useTiltNeon>4.9 Avg Rating</H3>

                    <p className="text-sm gray-500 leading-[1.6]">
                        Exceptional quality maintained across all bookings.
                    </p>
                </div>

            </div>
        </section>
    </div>
);

export default AboutPage;