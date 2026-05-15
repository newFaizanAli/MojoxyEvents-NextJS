import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema({
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "artist",
    required: true,
  },
  title: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  duration_minutes: { type: Number },
  capacity: { type: Number },
  extras: [{ title: String, price: Number, description: String }],
});

const Package =
  mongoose.models.package || mongoose.model("package", PackageSchema);

export default Package;
