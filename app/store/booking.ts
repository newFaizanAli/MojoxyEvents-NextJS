import { create } from "zustand";
import axios from "../lib/axios_config";
import { Booking } from "../types";
import { API_ENDPOINTS } from "../utilities/api-endpoints";
import { toastError, toastSuccess } from "../utilities/toast_utils";

interface BookingState {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, "_id">) => Promise<void>;
  fetchBookingDateByArtistId: (id: string) => Promise<Booking[] | null>;
}

const useBookingStore = create<BookingState>((set) => ({
  bookings: [],

  addBooking: async (booking) => {
    try {
      const response = await axios.post(
        `${API_ENDPOINTS.MAIN.BOOKING.ADD}`,
        booking,
      );

      const newBooking = response.data;

      if (newBooking.success) {
        toastSuccess(newBooking.message || "Booking added successfully");
        set((state) => ({
          bookings: [...state.bookings, newBooking.data],
        }));
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to add booking");
    }
  },

  fetchBookingDateByArtistId: async (id: string) => {
    try {
      const response = await axios.get(
        `${API_ENDPOINTS.MAIN.BOOKING?.DATES(id)}`,
      );

      return response.data;
    } catch (err) {
      console.error(err);
      toastError("Failed to fetch artist booking");
    }
  },
}));

export default useBookingStore;
