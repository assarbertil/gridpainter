import mongoose from "mongoose"

const facitSchema = new mongoose.Schema({
  colors: {
    type: [String],
    required: true,
  },
  pixelData: {
    type: [[String]],
    required: true,
  },
})

export const Facit = mongoose.model("Facit", facitSchema)
