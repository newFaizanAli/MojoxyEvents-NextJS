import Link from "next/link";
import { Artist } from "@/app/types";
import { ROUTES_PATHS } from "@/app/utilities/page_routes";
import { H2 } from "../../shared/Typography";
import { ArtistCard } from "../artist";
import { Badge } from "../../shared";
import { SkeletonCard } from "../../ui";

export default function FeaturedSection({ artists, loading }: {
    artists: Artist[],
    loading: boolean
}) {
    return <section className="py-12 px-12 bg-gray-50">
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div className="flex justify-between align-baseline mb-12">
                <div className="space-y-2">
                    <Badge variant="primary" size="md">Hand-picked</Badge>
                    <H2 useTiltNeon>Featured Artists</H2>
                </div>
            </div>
            {loading ? (
                <div className="grid grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-6">
                    {artists.map((artist, idx) => (
                        <Link href={ROUTES_PATHS.PUBLIC.ARTIST.PROFILE(artist._id as string)} key={idx}>
                            <ArtistCard key={idx} artist={artist} />
                        </Link>

                    ))}
                </div>
            )}
        </div>
    </section>;
}