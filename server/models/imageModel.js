import mongoose from "mongoose";

const imageSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
  },
  pixelData: {
    type: [[String]],
    required: true,
  },
  percentCorrect: {
    type: String,
    required: true,
  },
});

export const Image = mongoose.model("Image", imageSchema);
