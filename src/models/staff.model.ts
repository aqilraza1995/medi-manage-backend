import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    address:{type: String},
    ownerId: {
      type: mongoose?.Schema?.Types?.ObjectId,
      ref: "User",
      required: true
    },
    storeId:{
      type: mongoose?.Schema?.Types?.ObjectId,
      ref:"Store",
      required:true
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