import mongoose from "mongoose";

const ResetTokenSchema = new mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
  expires: { type: Date, required: true },
});

ResetTokenSchema.index({ expires: 1 }, { expireAfterSeconds: 0 });

const ResetToken =
  mongoose.models.tokens || mongoose.model("tokens", ResetTokenSchema);

export default ResetToken;
