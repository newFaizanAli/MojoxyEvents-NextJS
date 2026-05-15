import { H2 } from "@/app/components/shared/Typography";
import { Button } from "@/app/components/ui";


export default function CTA() {
    return (
        <div className="bg-linear-to-br from-purple-500 to-indigo-600 rounded-2xl p-6 text-white">
            <H2 useTiltNeon className="text-xl text-white sm:text-1xl mb-3">Ready to Book?</H2>
            <p className="text-sm text-brand-100 mb-4">Get a personalized quote for your event</p>

            <Button variant="secondary" fullWidth onClick={() => { }}>Book Now</Button>
        </div>
    )
}

