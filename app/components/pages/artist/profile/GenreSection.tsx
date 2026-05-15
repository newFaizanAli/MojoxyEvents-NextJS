import { memo } from "react";
import { Artist } from "@/app/types";
import { H2 } from "@/app/components/shared/Typography";

interface GenreSectionProps {
    artist: Artist;
}

function GenreSection({ artist }: GenreSectionProps) {
    const genres = artist.genres || [];

    if (!genres.length) return null;

    return (
        <section className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm">

            <H2 useTiltNeon className="text-xl sm:text-1xl mb-3">Genres</H2>

            <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                    <span
                        key={genre}
                        className="
              px-3 py-1.5
              rounded-lg
              bg-brand-100
              text-brand-700
              text-sm font-medium
              transition-colors
              hover:bg-brand-200
            "
                    >
                        {genre}
                    </span>
                ))}
            </div>
        </section>
    );
}

export default memo(GenreSection);