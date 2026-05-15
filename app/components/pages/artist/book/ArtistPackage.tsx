import { H2 } from "@/app/components/shared/Typography";
import { SearchableSelect } from "@/app/components/ui";
import { BookingFormData, BookingFormErrors, Package } from "@/app/types";

interface ArtistPackageProps {
    packages: Package[],
    formdata: BookingFormData,
    event_types: {
        label: string,
        value: string
    }[];
    setFormData: React.Dispatch<React.SetStateAction<BookingFormData>>;
    errors: BookingFormErrors;
    setErrors: React.Dispatch<React.SetStateAction<BookingFormErrors>>;
}


export default function ArtistPackage({ packages,
    formdata, event_types, setFormData, setErrors, errors
}: ArtistPackageProps) {
    return (
        <div className="space-y-6">
            <H2 useTiltNeon className="md:text-1xl sm:text-xl font-bold">Select Package & Event Type</H2>
            <div className="space-y-4">

                <div className="py-3">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Choose a Package</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {packages.map((pkg, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setFormData(prev => ({ ...prev, package: pkg?._id, budget: pkg?.price }));
                                    setErrors(prev => ({ ...prev, package: '' }));
                                }}
                                className={`p-4 rounded-xl text-left transition-all border-2 ${String(formdata?.package) === String(pkg?._id)
                                    ? 'border-solid border-purple-600 bg-purple-50'
                                    : 'border-solid border-gray-200 hover:border-purple-300'
                                    }`}
                            >
                                <h3 className="font-semibold text-gray-900">{pkg?.title}</h3>

                                {pkg?.description && (
                                    <p className="text-sm text-gray-600 mt-1">{pkg?.description}</p>
                                )}

                                <div className="mt-1 text-sm text-gray-500">
                                    <span>Duration: {pkg?.duration_minutes} mins</span>
                                    <span className="mx-2">|</span>
                                    <span>Capacity: {pkg?.capacity}</span>
                                </div>

                                <p className="text-lg font-bold text-purple-600 mt-2">
                                    PKR {pkg?.price?.toLocaleString()}
                                </p>
                            </button>
                        ))}
                    </div>
                    {errors.package && <p className="text-red-500 text-sm mt-1">{errors.package}</p>}
                </div>
                <div>
                    <SearchableSelect
                        label="Event Type"
                        placeholder="Search event type..."
                        options={event_types || []}
                        value={formdata?.event_type || ""}
                        onChange={(value) => {
                            setFormData((prev) => ({
                                ...prev,
                                event_type: value,
                            }));

                            setErrors((prev) => ({
                                ...prev,
                                event_type: "",
                            }));
                        }}
                        error={errors.event_type}
                    />

                </div>

            </div>
        </div>
    )
}