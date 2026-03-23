import mongoose from "mongoose";


const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true
    },
    planName: { type: String },
    storeLimit: { type: Number },
    startDate: Date,
    endDate: Date,
    isTrial: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["active", "expired"],
      default: "active"
    }
  },
  { timestamps: true }
)

export default mongoose.model("Subscription", subscriptionSchema)