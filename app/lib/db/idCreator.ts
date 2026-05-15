import mongoose from "mongoose";

interface IdCreatorParams {
  model: mongoose.Model<any>;
  idStr: string;
  idField: string;
  prefix?: string; // optional like "MJX"
  padLength?: number; // default 4
}

export const idCreator = async ({
  model,
  idStr,
  idField,
  prefix = "MJX",
  padLength = 4,
}: IdCreatorParams): Promise<string> => {
  if (!model?.findOne) {
    throw new Error("Invalid model provided");
  }

  const lastItem = await model
    .findOne({ [idField]: { $exists: true } })
    .sort({ [idField]: -1 })
    .exec();
  // .sort({ createdAt: -1 })
  // .lean();

  let newNumber = 1;

  if (lastItem?.[idField]) {
    const parts = lastItem[idField].split("-");

    const lastPart = parts[parts.length - 1];
    const parsed = parseInt(lastPart, 10);

    if (!isNaN(parsed)) {
      newNumber = parsed + 1;
    }
  }

  const padded = String(newNumber).padStart(padLength, "0");

  return `${prefix}-${idStr}-${padded}`;
};
