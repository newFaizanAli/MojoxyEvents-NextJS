import { H2 } from '@/app/components/shared/Typography';
import { Artist } from '@/app/types'

export default function EventType({ artist }: {
    artist: Artist
}) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
            <H2 useTiltNeon className="text-xl sm:text-1xl mb-3">Event Types</H2>
            <div className="space-y-2">
                {artist?.event_types.map((event, idx) => {

                    return (
                        <div
                            key={idx}
                            className="flex items-center gap-2 text-sm text-gray-700"
                        >
                            <div className="w-1.5 h-1.5 bg-brand-600 rounded-full" />
                            {event}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

