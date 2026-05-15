"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Artist, BookingFormData, BookingFormErrors, Package } from "@/app/types";
import { EVENT_TYPES } from "@/app/utilities/mock_data";
import { useArtistStore, usePackageStore, useBookingStore } from "@/app/store";
import {
    ArtistBookingHeroSec, ArtistBookingStepper, ArtistBookingPackage,
    ArtistBookingDateTimeLoc, ArtistBookingBudgetSection
} from "@/app/components/pages/artist/book";
import { Button } from "@/app/components/ui";

const ArtistBookingPage = () => {

    const { id } = useParams<{ id: string }>();
    const { fetchArtistById } = useArtistStore();
    const { fetchPackageByArtistId } = usePackageStore();
    const { addBooking, fetchBookingDateByArtistId } = useBookingStore();

    const [artist, setArtist] = useState<Artist | null>(null);
    const [artistPackages, setArtistPackages] = useState<Package[] | null>(null);
    const [bookedDates, setBookedDates] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [step, setStep] = useState(1);


    const [formData, setFormData] = useState<BookingFormData>({
        package: '',
        event_date: '',
        event_time: '',
        event_loc: '',
        event_type: '',
        attendees: 1,
        budget: 0,
        contract_term: '',
        admin_note: '',
        payment: '',
        accepted_by_artist: false,
        accepted_by_user: false,
        user: null,
        artist: artist?._id || null,
        status: "pending"
    });

    const [errors, setErrors] = useState<BookingFormErrors>({});

    useEffect(() => {
        if (!id) return;

        let isMounted = true;

        const load = async () => {
            setLoading(true);

            try {
                const data = await fetchArtistById(id);
                if (isMounted) setArtist(data);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        load();

        return () => {
            isMounted = false;
        };
    }, [id, fetchArtistById]);


    useEffect(() => {
        if (!artist) return;

        let isMounted = true;

        const loadArtistData = async () => {
            try {
                // fetch packages
                const packages = await fetchPackageByArtistId(
                    artist._id as string
                );

                // fetch booked dates
                const bookingDates = await fetchBookingDateByArtistId(
                    artist._id as string
                );

                if (isMounted) {
                    if (packages) {
                        setArtistPackages(packages);
                    }

                    if (bookingDates) {
                        const dates = bookingDates
                            .map((b) => {
                                const date = new Date(b.event_date);

                                return isNaN(date.getTime())
                                    ? null
                                    : date.toISOString().split("T")[0];
                            })
                            .filter(Boolean) as string[];

                        setBookedDates(dates);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        loadArtistData();

        return () => {
            isMounted = false;
        };
    }, [
        artist,
        fetchPackageByArtistId,
        fetchBookingDateByArtistId
    ]);


    const validateStep = useCallback((stepNum: number) => {
        const newErrors: BookingFormErrors = {};

        if (stepNum === 1) {
            if (!formData.package) newErrors.package = 'Please select a package';
            if (!formData.event_type) newErrors.event_type = 'Please select an event type';
        }

        if (stepNum === 2) {
            if (!formData.event_time) newErrors.event_time = 'Please add event time';
            if (!formData.event_loc) newErrors.event_loc = 'Please select an event location';
            if (!formData.event_loc) { newErrors.attendees = 'Please add no of attendance' }
            else {
                const select_package = artistPackages?.find((p) => p._id === formData.package);
                if (select_package) {
                    if (formData.attendees > select_package.capacity) {
                        newErrors.attendees = `Please add no of attendance less than ${select_package.capacity}`
                    }
                }
            };
        }


        if (stepNum === 3) {
            if (!formData.budget || formData.budget <= 0) newErrors.budget = 'Please add budget';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData, artistPackages]);


    const handleNext = useCallback(() => {
        if (validateStep(step)) {
            setStep(step + 1);
        }
    }, [step, validateStep]);


    const handleSubmit = useCallback(async () => {
        if (!validateStep(3)) return;

        setIsSubmitting(true);


        try {

            addBooking({
                ...formData,
                artist: id as string,
                package: formData.package as string,
                user: null,
                payment: formData.payment ?? null,
            });

            await new Promise(resolve => setTimeout(resolve, 1500));
            setStep(4);
        } catch (error) {
            console.error('Booking error:', error);
            alert('Failed to create booking. Please try again.');
        } finally {
            setIsSubmitting(false);
        }

    }, [formData, addBooking, id, validateStep]);


    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500">Loading artist...</p>
            </div>
        );
    }

    if (!artist) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Button variant="outline">← Back to Artists</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen">
            <div className="max-w-4xl mx-auto">
                <ArtistBookingHeroSec artist={artist} />
                <ArtistBookingStepper step={step} />
                <div className="bg-white rounded-2xl p-8 shadow-sm my-3">
                    {step === 1 && (
                        <ArtistBookingPackage
                            packages={artistPackages || []}
                            event_types={EVENT_TYPES || []}
                            formdata={formData}
                            setFormData={setFormData}
                            errors={errors}
                            setErrors={setErrors}
                        />
                    )}

                    {step === 2 && (

                        <ArtistBookingDateTimeLoc
                            booked_dates={bookedDates || []}
                            packages={artistPackages || []}
                            formdata={formData}
                            setFormData={setFormData}
                            errors={errors}
                            setErrors={setErrors}
                        />
                    )}

                    {step === 3 && (

                        <ArtistBookingBudgetSection
                            formdata={formData}
                            setFormData={setFormData}
                            errors={errors}
                            setErrors={setErrors}
                        />
                    )}



                    {step < 4 && (
                        <div className="flex gap-4 justify-center mt-8 pt-6 border-t border-gray-200">
                            {step > 1 && (
                                <Button
                                    onClick={() => setStep(step - 1)}
                                    variant="ghost"
                                >
                                    Previous
                                </Button>
                            )}
                            <Button
                                onClick={step === 3 ? handleSubmit : handleNext}
                                disabled={isSubmitting}
                                variant="ghost"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Processing...
                                    </>
                                ) : step === 3 ? (
                                    'Submit Booking Request'
                                ) : (
                                    'Next Step'
                                )}
                            </Button>
                        </div>
                    )}


                </div>
            </div>
        </div>
    )
}

export default ArtistBookingPage
