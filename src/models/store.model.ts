import mongoose from "mongoose";


const storeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    phone: { type: String },
    gst: { type: String }
  },
  { timestamps: true }
)

export default mongoose.model("Store", storeSchema) 