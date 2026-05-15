import { IconName } from "@/app/types";
import { Badge, Icon } from "../../shared";
import { H2, H3 } from "../../shared/Typography";

const BookingStepOptions =
    [
        { step: "01", icon: "search", title: "Discover", desc: "Browse our curated roster of verified artists across every genre and style." },
        { step: "02", icon: "calendar", title: "Book", desc: "Choose your date, confirm details, and book securely through our platform." },
        { step: "03", icon: "music", title: "Enjoy", desc: "Relax and enjoy an unforgettable performance at your event." },
    ]


export default function HowItWorks() {
    return (
        <section className="bg-white px-6 py-20">
            <div className="mx-auto max-w-250 text-center">
                <div className="space-y-2">
                    <Badge variant="indigo" size="md">Simple Process</Badge>
                    <H2 useTiltNeon>Book in 3 Easy Steps</H2>
                    <p className="text-lg mb-18 text-gray-400">From discovery to performance in minutes</p>
                </div>
                <div className="grid grid-cols-3 gap-10">
                    {BookingStepOptions.map((s, i) => (
                        <div className="relative py-10 px-6 rounded-4xl bg-gray-50 border border-gray-200 " key={i}>
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-linear-to-br from-(--primary) to-(--indigo) text-white rounded-full px-3.5 py-1 text-xs font-extrabold tracking-wide">
                                {s.step}
                            </div>
                            <div className="w-15 h-15 rounded-lg bg-(--accent-soft) flex items-center justify-center mx-auto my-4">
                                <Icon name={s.icon as IconName} size={26} color="var(--primary)" />
                            </div>
                            {/* <h3 className="text-2xl font-bold mb-2 text-gray-900" style={{ fontFamily: "var(--font-display)" }}>{s.title}</h3> */}
                            <H3 useTiltNeon className="mb-2">{s.title}</H3>
                            <p className="text-gray-500 text-sm leading-relaxed" >{s.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}