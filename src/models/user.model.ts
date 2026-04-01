import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    role: { type: String, enum: ["admin", "owner", "staff"], default: "owner" },
    storeId: { type: mongoose?.Schema?.Types?.ObjectId, ref: "Store" },
    createdBy: { type: mongoose?.Schema?.Types?.ObjectId, ref: "User" },
    onboardingCompleted: { type: Boolean, default: false },
    activeSubscriptionId:{type:mongoose?.Schema?.Types?.ObjectId, ref: "Subscription", default: null},
  },
  { timestamps: true }
)

export default mongoose.model("User", userSchema)