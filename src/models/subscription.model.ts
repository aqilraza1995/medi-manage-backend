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
    duration: { type: Number, required: true },
    planSnapshot: {
      name: { type: String , required:true},
      storeLimit: { type: Number, required:true },
      price: { type: Number },
      duration: { type: Number, reuired:true }
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    isTrial: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["active", "expired", "cancelled"],
      default: "active"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Subscription", subscriptionSchema);