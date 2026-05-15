import mongoose from "mongoose";

const ArtistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  stage_name: {
    type: String,
    required: true,
  },
  short_desc: {
    type: String,
  },
  img_link: {
    type: String,
  },
  is_travel_flexible: {
    type: Boolean,
    default: false,
  },
  is_featured: {
    type: Boolean,
    default: false,
  },
  is_available: {
    type: Boolean,
    default: true,
  },
  is_verified: {
    type: Boolean,
    default: false,
  },
  story_img_link: {
    type: String,
  },
  bio: {
    type: String,
  },
  gender: {
    type: String,
  },
  gallery: [
    {
      type: {
        type: String,
        enum: ["photo", "video"],
      },
      link: {
        type: String,
      },
    },
  ],
  performing_members: {
    type: Number,
    default: 1,
  },
  offstage_members: {
    type: Number,
    default: 0,
  },
  languages: [
    {
      name: String,
    },
  ],
  achievements: [
    {
      name: String,
      for: String,
      year: String,
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
    required: true,
  },
  genres: [
    {
      type: String,
    },
  ],
  event_types: [
    {
      type: String,
    },
  ],
  perform_locations: [
    {
      type: String,
    },
  ],
});

// existing indexes
ArtistSchema.index({ stage_name: 1 }, { unique: true });
ArtistSchema.index({ category: 1 });
ArtistSchema.index({ event_types: 1 });

ArtistSchema.index(
  {
    stage_name: "text",
    short_desc: "text",
    genres: "text",
  },
  {
    weights: {
      stage_name: 10,
      genres: 5,
      short_desc: 2,
    },
  },
);

const Artist = mongoose.models.artist || mongoose.model("artist", ArtistSchema);

export default Artist;
