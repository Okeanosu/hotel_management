import mongoose from "mongoose";
const { Schema } = mongoose;

const roomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      required: true,
    },
    descriptions: {
      type: String,
      required: false,
    },
    images: [
      {
        type: Schema.Types.ObjectId,
        ref: "Image",
        required: false,
      },
    ],
    area: {
      type: Number,
      required: true,
    },
    high: {
      type: Number,
      required: true,
    },
    bedSize: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    equipment: {
      type: [String],
      required: false,
    },
    metaTitle: {
      type: String,
      required: false,
    },
    metaKeyword: {
      type: String,
      required: false,
    },
    metaDescription: {
      type: String,
      required: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Room", roomSchema);
