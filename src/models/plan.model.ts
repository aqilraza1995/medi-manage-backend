import mongoose from "mongoose";

const planSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    maxStores: { type: Number, required: true },
    features: [{ type: String }],
    durations: [{ type: Number }],      // [1,2,3,4]
    pricing: {
      type: Map,
      of: new mongoose.Schema(
        { total: { type: Number, required: true } },
        { _id: false }
      )
    },
    isRecommended: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export default mongoose.model("Plan", planSchema);