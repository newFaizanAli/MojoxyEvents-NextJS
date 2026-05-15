import { Artist, IconName } from "@/app/types";
import { Icon } from "@/app/components/shared";
import { H2 } from "@/app/components/shared/Typography";

export default function QuickInfo({ artist }: { artist: Artist }) {
    return (
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
            <H2 useTiltNeon className="text-xl sm:text-1xl mb-3">Quick Info</H2>

            {/* Team */}
            <InfoRow
                icon="users"
                label="Team Size"
                value={`${artist.performing_members} performing, ${artist.offstage_members} offstage`}
            />

            {/* Languages */}
            {!!artist.languages?.length && (
                <InfoRow
                    icon="languages"
                    label="Languages"
                    value={artist.languages.map(l => l.name).join(", ")}
                />
            )}

            {/* Locations */}
            {!!artist.perform_locations?.length && (
                <InfoRow
                    icon="map"
                    label="Locations"
                    value={
                        artist.perform_locations.slice(0, 3).join(", ") +
                        (artist.perform_locations.length > 3
                            ? ` +${artist.perform_locations.length - 3} more`
                            : "")
                    }
                />
            )}
        </div>
    );
}

function InfoRow({
    icon,
    label,
    value,
}: {
    icon: IconName;
    label: string;
    value: string;
}) {
    return (
        <div className="flex gap-3">
            <Icon name={icon} size={18} />
            <div>
                <p className="text-sm font-medium">{label}</p>
                <p className="text-sm text-gray-600">{value}</p>
            </div>
        </div>
    );
}