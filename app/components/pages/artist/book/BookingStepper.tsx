import { Icon } from "@/app/components/shared";

const labels = ['Package & Event', 'Date & Location', 'Budget & Terms', 'Confirm'];

export default function BookingStepper({ step }: { step: number }) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
            <div className="flex items-center justify-between">
                {labels?.map((label, idx) => (
                    <div key={idx} className="flex items-center flex-1">
                        <div className="flex flex-col items-center">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${step > idx + 1 ? 'bg-green-500 text-white' :
                                step === idx + 1 ? 'bg-purple-600 text-white' :
                                    'bg-gray-200 text-gray-500'
                                }`}>
                                {step > idx + 1 ? <Icon name="check_circle" /> : idx + 1}
                            </div>
                            <span className="text-xs mt-2 text-gray-600 text-center">{label}</span>
                        </div>
                        {idx < 3 && (
                            <div className={`flex-1 h-1 mx-4 ${step > idx + 1 ? 'bg-green-500' : 'bg-gray-200'}`} />
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}