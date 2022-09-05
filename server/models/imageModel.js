import mongoose from "mongoose"

const imageSchema = new mongoose.Schema({
  teamId: {
    type: String,
    required: true,
  },
  teamName: {
    type: String,
    required: true,
  },
  pixelData: {
    type: [[String]],
    required: true,
  },
  percentCorrect: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  }
})

export const Image = mongoose.model("Image", imageSchema)
