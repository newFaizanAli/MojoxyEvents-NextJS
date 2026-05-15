"use client";

import Image from "next/image";
import Link from "next/link";
import { Artist } from "@/app/types";
import { AppImage, Icon } from "@/app/components/shared";
import { Button } from "@/app/components/ui";
import { ROUTES_PATHS } from "@/app/utilities/page_routes";
import { H2 } from "@/app/components/shared/Typography";

export default function HeroSection({ artist }: { artist: Artist }) {
    return (
        <header className="relative h-105 sm:h-120 lg:h-130 overflow-hidden">
            {artist.story_img_link && (
                <AppImage
                    src={artist.story_img_link as string}
                    alt={artist.stage_name || "artist"}
                />
            )}

            <div className="absolute inset-0 bg-linear-to-t from-brand/90 via-brand/40 to-transparent" />

            <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center bg-black/30 backdrop-blur-md rounded-2xl p-4 sm:p-5">

                        {/* Avatar */}
                        {artist.img_link && (
                            <Image
                                src={artist.img_link as string}
                                alt={artist.stage_name || "artist"}
                                width={120}
                                height={120}
                                className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 rounded-xl shadow-white shadow-xs object-cover"
                            />
                        )}

                        {/* Content */}
                        <div className="flex-1 text-center sm:text-left">
                            {/* <h1 className="text-white font-bold text-xl sm:text-3xl lg:text-4xl">
                                {artist.stage_name}
                            </h1> */}

                            <H2 useTiltNeon className="text-white font-boldtext-xl sm:text-3xl lg:text-4xl">{artist.stage_name}</H2>

                            <p className="text-white/80 text-sm sm:text-base mt-1 line-clamp-2">
                                {artist.short_desc || "No description available"}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                                {artist.category?.name && (
                                    <span className="px-3 py-1 text-xs rounded-full bg-white/20 text-white">
                                        {artist.category.name}
                                    </span>
                                )}

                                {artist.is_travel_flexible && (
                                    <span className="px-3 py-1 text-xs rounded-full bg-brand-500/80 text-white flex items-center gap-1">
                                        <Icon name="map" size={14} />
                                        Travel Flexible
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* CTA */}
                        <Link
                            href={ROUTES_PATHS.PROTECTED.BOOKING.ADD(artist._id as string)}
                        >
                            <Button variant="secondary">Book Now</Button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}