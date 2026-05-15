import { Input } from "@/app/components/ui";
import { BookingFormData, BookingFormErrors } from "@/app/types";

interface Props {
    formdata: BookingFormData;
    setFormData: React.Dispatch<React.SetStateAction<BookingFormData>>;
    errors: BookingFormErrors;
    setErrors: React.Dispatch<React.SetStateAction<BookingFormErrors>>;
}


export default function BudgetSection
    ({
        formdata,
        setFormData,
        errors,
        setErrors
    }: Props) {
    return (
        <div className="space-y-6">
            <Input label="Budget" placeholder="Enter your budget" name="budget" type="number"
                value={formdata.budget}
                onChange={(e) => {
                    setFormData(prev => ({ ...prev, budget: parseFloat(e.target.value) || 0 }));
                    setErrors(prev => ({ ...prev, budget: '' }));
                }}
                error={errors.budget}
            />
        </div>
    )
}