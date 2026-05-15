import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@/app/types";
import { ROUTES_PATHS } from "@/app/utilities/page_routes";
import { SearchBar } from "../../shared";
import { H1 } from "../../shared/Typography";


const StatStripOptions = [
    { val: "500+", label: "Artists" },
    { val: "10K+", label: "Events Booked" },
    { val: "98%", label: "Satisfaction Rate" },
    { val: "50+", label: "Cities" },
]

export default function HeroSection({
    categories,
}: {
    categories: Category[];
}) {

    const router = useRouter();

    const onCategoryClick = useCallback(
        (id: string) => {
            router.push(`${ROUTES_PATHS.PUBLIC.ARTIST.LIST}?category=${id}`);
        },
        [router]
    );

    const handleSearch = (query: string) => {
        if (!query.trim()) return;

        router.push(ROUTES_PATHS.PUBLIC.ARTIST.LIST + `?search=${encodeURIComponent(query.trim())}`);
    };

    return (
        <section
            className="
        relative overflow-hidden text-center px-4 sm:px-6
        pt-20 sm:pt-28 pb-20 sm:pb-28
        bg-[linear-gradient(135deg,#0D0020_0%,#1A0040_40%,#0A0030_80%,#05001A_100%)]
      "
        >
            {/* Decorative Orbs */}
            <div className="absolute -top-24 left-[20%] w-72 sm:w-96 h-72 sm:h-96 rounded-full
        bg-[radial-gradient(circle,rgba(124,58,237,0.25)_0%,transparent_70%)] blur-3xl" />

            <div className="absolute -bottom-24 right-[10%] w-72 sm:w-96 h-72 sm:h-96 rounded-full
        bg-[radial-gradient(circle,rgba(79,70,229,0.2)_0%,transparent_70%)] blur-3xl" />

            {/* Content */}
            <div className="relative max-w-5xl mx-auto">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 bg-purple-700/15 border border-purple-400/30 rounded-full px-4 py-1.5 mb-6">
                    <span className="w-2 h-2 rounded-full bg-purple-300 animate-pulse" />
                    <span className="text-xs sm:text-sm text-purple-200 font-medium">
                        500+ World-Class Artists Available
                    </span>
                </div>

                {/* Heading */}
                <H1 useTiltNeon className="
            text-4xl sm:text-5xl lg:text-6xl xl:text-[68px]
            font-black leading-tight text-white tracking-tight mb-6
          ">
                    Book Extraordinary <br />
                    <span className="bg-linear-to-r from-purple-300 to-indigo-400 bg-clip-text text-transparent">
                        Artists & Performers
                    </span>
                </H1>

                {/* Description */}
                <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
                    Discover, connect, and book world-class musicians, DJs, vocalists, and performers
                    for any event — seamlessly.
                </p>

                {/* Search */}
                <div className="max-w-xl mx-auto mb-8">
                    <SearchBar onSearch={handleSearch} placeholder="Search by name..." large />
                </div>

                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                    {categories.map((tag) => (
                        <button
                            key={tag._id}
                            onClick={() => onCategoryClick(tag?._id as string)}
                            className="
                text-sm font-semibold px-4 py-2 rounded-full
                border border-purple-400/25 text-purple-200
                bg-white/5 hover:bg-purple-500/20 hover:border-purple-400/50
                transition-all duration-200
              "
                        >
                            {tag.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Stats */}
            <div className="mt-14 flex flex-wrap justify-center gap-8 sm:gap-12">
                {StatStripOptions.map((s) => (
                    <div key={s.label} className="text-center">
                        <div
                            className="text-2xl sm:text-3xl font-bold text-white mb-1"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            {s.val}
                        </div>
                        <div className="text-xs sm:text-sm text-gray-400">
                            {s.label}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}