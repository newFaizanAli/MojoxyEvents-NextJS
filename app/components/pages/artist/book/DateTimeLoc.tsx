"use client";
import { useState } from "react";
import { BookingFormData, BookingFormErrors, Package } from "@/app/types";
import { getDaysInMonth, formatDateForInput, isDateBooked, isDatePast } from "@/app/utilities/booking";
import { CITIESLIST } from "@/app/utilities/locations";
import { H2, H3 } from "@/app/components/shared/Typography";
import { Icon } from "@/app/components/shared";
import { Button, Input, SearchableSelect } from "@/app/components/ui";


interface Props {
    booked_dates: string[]
    formdata: BookingFormData;
    setFormData: React.Dispatch<React.SetStateAction<BookingFormData>>;
    packages: Package[]
    errors: BookingFormErrors;
    setErrors: React.Dispatch<React.SetStateAction<BookingFormErrors>>;
}


export default function DateTimeLoc({
    booked_dates,
    formdata,
    setFormData,
    packages,
    errors,
    setErrors
}: Props) {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const daysList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const legends = [
        { label: "Selected", className: "bg-purple-600" },
        { label: "Booked", className: "bg-red-50 border border-red-200" },
        { label: "Past", className: "bg-gray-50" },
    ];


    const handleDateSelect = (dateStr: string) => {
        if (isDateBooked(booked_dates, dateStr) || isDatePast(dateStr)) return;

        setSelectedDate(dateStr);
        setFormData((prev) => ({ ...prev, event_date: dateStr }));
        setErrors((prev) => ({ ...prev, event_date: "" }));
    };


    const renderCalendar = () => {

        const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const days = [];

        // Empty cells before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(<div key={`empty-${i}`} className="aspect-square" />);
        }


        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = formatDateForInput(year, month, day);
            const isBooked = isDateBooked(booked_dates, dateStr);
            const isPast = isDatePast(dateStr);
            const isSelected = selectedDate === dateStr;
            const isDisabled = isBooked || isPast;

            days.push(
                <button
                    key={day}
                    onClick={() => handleDateSelect(dateStr)}
                    disabled={isDisabled}
                    className={`
            aspect-square rounded-lg text-sm font-medium transition-all
            ${isSelected ? 'bg-purple-600 text-white ring-2 ring-purple-600 ring-offset-2' : ''}
            ${!isSelected && !isDisabled ? 'hover:bg-purple-50 text-gray-700' : ''}
            ${isDisabled ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer'}
            ${isBooked && !isPast ? 'bg-red-50 text-red-400' : ''}
            ${isPast ? 'bg-gray-50' : ''}
          `}
                >
                    {day}
                </button>
            );
        }

        return days;
    };


    return (
        <div className="space-y-6">
            <H2 useTiltNeon className="md:text-1xl sm:text-xl font-bold">Select Date, Time & Location</H2>
            <div className="space-y-4">
                <div>
                    <SearchableSelect
                        label="Event Location"
                        placeholder="Search location..."
                        options={CITIESLIST || []}
                        value={formdata?.event_loc || ""}
                        onChange={(value) => {
                            setFormData((prev) => ({
                                ...prev,
                                event_loc: value,
                            }));

                            setErrors((prev) => ({
                                ...prev,
                                event_loc: "",
                            }));
                        }}
                        error={errors.event_loc}
                        icon="map"
                    />
                </div>
                <div>
                    <Input label="Event Time" name="event_time" type="time"
                        value={formdata.event_time}
                        onChange={(e) => setFormData(prev => ({ ...prev, event_time: e.target.value }))}
                        icon="clock" error={errors.event_time}
                    />
                </div>
                <div>
                    <Input label="Expected Attendees" name="attendees" type="number"
                        value={formdata.attendees}
                        onChange={(e) => {
                            const attendees = parseInt(e.target.value) || 1;
                            setFormData(prev => ({ ...prev, attendees }));

                            const selectedPackage = packages.find(pkg => pkg._id === formdata.package);
                            if (selectedPackage && attendees > selectedPackage.capacity) {
                                setErrors(prev => ({ ...prev, attendees: `Cannot exceed package capacity (${selectedPackage.capacity})` }));
                            } else {
                                setErrors(prev => ({ ...prev, attendees: '' }));
                            }
                        }}
                        error={errors.attendees}
                    />
                </div>
                <div className="border border-gray-200 rounded-xl p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Event Date</label>
                    <div className="flex items-center justify-between mb-4">
                        <Button
                            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                            className="p-2 hover:bg-gray-100 rounded-lg"
                            variant="secondary"
                        >
                            <Icon name="arrowLeft" size={20} />
                        </Button>
                        <H3>{currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</H3>
                        <Button
                            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                            variant="secondary"
                        >
                            <Icon name="arrowRight" size={20} />
                        </Button>
                    </div>
                    <div className="grid grid-cols-7 gap-2 mb-2">
                        {daysList?.map(day => (
                            <div key={day} className="text-center text-sm font-medium text-gray-500">
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className="space-y-4">
                        <div className="grid grid-cols-7 gap-2">
                            {renderCalendar()}
                        </div>
                        <div className="flex items-center gap-4 mt-4 text-xs text-gray-600">
                            {legends.map((item) => (
                                <div
                                    key={item.label}
                                    className="flex items-center gap-2"
                                >
                                    <div className={`w-4 h-4 rounded ${item.className}`} />
                                    <span>{item.label}</span>
                                </div>
                            ))}
                            {errors.event_date && <p className="text-red-500 text-sm mt-1">{errors.event_date}</p>}
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )

}