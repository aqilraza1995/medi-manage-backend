import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    ownerId: {
      type: mongoose?.Schema?.Types?.ObjectId,
      ref: "User",
      required: true
    },
    shopId: {
      type: mongoose?.Schema?.Types?.ObjectId,
      ref: "Store",
      required: true
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active"
    }

  },
  { timestamps: true }
)

export default mongoose.model("Staff", staffSchema)