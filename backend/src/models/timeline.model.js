import mongoose, { Schema } from "mongoose";
const timelineSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    timeline: {
      from: String,
      to: String,
    },
  },
  { timestamps: true }
);
export const Timeline = mongoose.model("Timeline", timelineSchema);
