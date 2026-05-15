"use client";

import { Artist } from "@/app/types";
import { AppImage } from "@/app/components/shared";
import { H1 } from "@/app/components/shared/Typography";

export default function HeroSection({ artist }: { artist: Artist }) {
    return (
        <div className="my-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-4">
                <AppImage
                    src={artist.img_link as string}
                    alt={artist?.stage_name || "N/A"}
                    width={112}
                    height={112}
                    fill={false}
                    className="w-28 h-28 rounded-2xl object-cover"
                />

                <div>
                    {/* <h1
                        className="text-2xl font-bold text-gray-900"
                        style={{ fontFamily: "var(--font-display)" }}
                    >
                        Book {artist?.stage_name || "N/A"}
                    </h1> */}

                    <H1 useTiltNeon className="md:text-2xl sm:text-2xl">Book {artist?.stage_name || "N/A"}</H1>

                    <p className="text-gray-600 text-md">
                        {artist?.short_desc
                            ? artist.short_desc.length > 200
                                ? `${artist.short_desc.slice(0, 200)}...`
                                : artist.short_desc
                            : "N/A"}
                    </p>
                </div>
            </div>
        </div>
    );
}