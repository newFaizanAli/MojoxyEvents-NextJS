import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  booking_id: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "artist",
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "payment",
    default: null,
  },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "package",
  },
  event_loc: { type: String },
  event_type: { type: String },
  event_date: { type: Date, required: true },
  event_time: { type: String, required: true },
  accepted_by_user: { type: Boolean, default: false },
  accepted_by_artist: { type: Boolean, default: false },
  contract_term: { type: String },
  admin_note: { type: String },
  status: { type: String, default: "pending" },
  attendees: { type: Number, default: 1 },
  budget: { type: Number, required: true },
});

BookingSchema.index({ artist: 1, event_date: 1 });
BookingSchema.index({ user: 1 });
BookingSchema.index({ artist: 1 });

const Booking =
  mongoose.models.booking || mongoose.model("booking", BookingSchema);

export default Booking;
