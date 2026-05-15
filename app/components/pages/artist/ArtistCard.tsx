import { Artist } from "@/app/types";
import { Card } from "../../ui";
import { AppImage, Badge } from "../../shared";
import { H3 } from "../../shared/Typography";


interface ArtistProps {
    artist: Artist;
    onClick?: () => void;
}

const ArtistCard = ({ artist, onClick }: ArtistProps) => {
    return (
        <Card className="cursor-pointer" hover onClick={onClick}>
            <div className="relative">
                <div className="h-50 bg-linear-to-br from-primary to-indigo flex items-center justify-center overflow-hidden">
                    <div className="relative w-full h-full">
                        <AppImage
                            src={artist.img_link as string}
                            alt={artist?.stage_name || "Artist image"}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)" }} />
                </div>

                {artist.is_featured && (
                    <div className="absolute top-3 left-3">
                        <Badge variant="warning">⭐ Featured</Badge>
                    </div>
                )}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    {artist.is_verified && <Badge variant="success">✓ Verified</Badge>}
                    <Badge variant={artist.is_available ? "success" : "error"}>{artist.is_available ? "Available" : "Unavailable"}</Badge>
                </div>
            </div>
            <div className="p-4">
                <div className="flex items-start justify-between mb-1.5">
                    <div>

                        <H3 useTiltNeon className="mb-1.5">{artist.stage_name}</H3>

                        <p className="text-xs font-semibold text-(--primary)"
                        >
                            {artist.genres?.length
                                ? artist.genres.map(g =>
                                    g.replace("_", " ").replace(/\b\w/g, c => c.toUpperCase())
                                ).join(", ")
                                : "No Genre"}
                        </p>
                    </div>

                </div>
                {/* <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
                    <Icon name="map" size={12} color="var(--gray-400)" />
                    <span style={{ fontSize: 12, color: "var(--gray-500)" }}>{artist.location}</span>
                </div> */}

            </div>
        </Card>
    );
};


export default ArtistCard;