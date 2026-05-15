import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  description: {
    type: String,
  },
  img_link: {
    type: String,
  },
  genres: [
    {
      genre: {
        type: String,
      },
      name: {
        type: String,
      },
    },
  ],
});

CategorySchema.index({ slug: 1 }, { unique: true });
CategorySchema.index({ name: 1 });

const Category =
  mongoose.models.category || mongoose.model("category", CategorySchema);

export default Category;
