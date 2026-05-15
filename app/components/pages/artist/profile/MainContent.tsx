"use client";

import { useState, useMemo } from "react";
import { Artist } from "@/app/types";
import { AppImage, Icon } from "@/app/components/shared";
import { H2 } from "@/app/components/shared/Typography";

export default function MainContent({ artist }: { artist: Artist }) {
    const [selected, setSelected] = useState(0);

    const gallery = useMemo(() => artist.gallery || [], [artist.gallery]);
    const achievements = useMemo(() => artist.achievements || [], [artist.achievements]);

    return (
        <section className="lg:col-span-2 space-y-8">

            {/* About */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
                <H2 useTiltNeon className="text-xl sm:text-2xl font-bold mb-3">About</H2>
                <p className="text-gray-700 leading-relaxed">
                    {artist.bio || "No bio available"}
                </p>
            </div>

            {/* Gallery */}
            {gallery.length > 0 && (
                <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
                    <H2 useTiltNeon className="text-xl sm:text-2xl font-bold mb-3">Gallery</H2>

                    <div className="relative h-64 sm:h-80 lg:h-96 rounded-xl overflow-hidden">
                        <AppImage
                            src={gallery[selected].link}
                            alt="gallery"
                        />
                    </div>

                    <div className="grid grid-cols-5 sm:grid-cols-6 gap-2 mt-3">
                        {gallery.map((item, i) => (
                            <button
                                key={i}
                                onClick={() => setSelected(i)}
                                className={`relative h-14 sm:h-20 rounded-lg overflow-hidden ${selected === i ? "ring-2 ring-brand-600" : "opacity-70"
                                    }`}
                            >
                                <AppImage src={item.link} alt={item.type} />
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Achievements */}
            {achievements.length > 0 && (
                <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm">
                    <H2 useTiltNeon className="text-xl sm:text-2xl font-bold mb-3">Achievements</H2>

                    <div className="space-y-3">
                        {achievements.map((a, i) => (
                            <div
                                key={i}
                                className="flex gap-4 p-4 bg-linear-to-r from-brand-50 to-purple-50 rounded-xl"
                            >
                                <div className="w-10 h-10 flex items-center justify-center bg-brand-100 rounded-full">
                                    <Icon name="award" size={18} />
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-semibold">{a.name}</h3>
                                    <p className="text-sm text-gray-600">{a.for}</p>
                                </div>

                                <span className="text-sm font-medium text-brand-600">
                                    {a.year}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}