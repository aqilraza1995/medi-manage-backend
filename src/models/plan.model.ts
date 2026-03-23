import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ["basic", "standard", "premium"],
      reuired: true
    },
    storeLimit: { type: Number, required: true },
    duration: { type: Number, required: true },
    price: { type: Number, required: true }
  },
  { timestamps: true }
)

export default mongoose.model("plan", planSchema)