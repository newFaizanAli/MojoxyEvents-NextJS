"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Artist } from "@/app/types";
import { useArtistStore } from "@/app/store";
import {
    ArtistProfileHeroSec,
    ArtistProfileMainContent,
    ArtistProfileQuickInfo,
    ArtistProfileGenreSec,
    ArtistProfileEventType,
    ArtistProfileCTA,
} from "@/app/components/pages/artist/profile";
import { Button } from "@/app/components/ui";

export default function ArtistProfilePage() {
    const { id } = useParams<{ id: string }>();
    const { fetchArtistById } = useArtistStore();

    const [artist, setArtist] = useState<Artist | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        let isMounted = true;

        const load = async () => {
            setLoading(true);

            try {
                const data = await fetchArtistById(id);
                if (isMounted) setArtist(data);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        load();

        return () => {
            isMounted = false;
        };
    }, [id, fetchArtistById]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading artist...</p>
            </div>
        );
    }

    if (!artist) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Button variant="outline">← Back to Artists</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <ArtistProfileHeroSec artist={artist} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
                    <ArtistProfileMainContent artist={artist} />

                    <aside className="space-y-6">
                        <ArtistProfileQuickInfo artist={artist} />

                        {!!artist.genres?.length && (
                            <ArtistProfileGenreSec artist={artist} />
                        )}

                        {!!artist.event_types?.length && (
                            <ArtistProfileEventType artist={artist} />
                        )}

                        <ArtistProfileCTA />
                    </aside>
                </div>
            </div>
        </div>
    );
}