import mongoose from "mongoose";
const { Schema } = mongoose;

const tourSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    tourCode: {
      type: String,
      required: true,
    },
    images: [
      {
        type: Schema.Types.ObjectId,
        ref: "Image",
        required: false,
      },
    ],
    tripSchedules: [
      {
        time: {
          type: String,
          required: true,
        },
        content: {
          type: String,
          required: true,
        },
      },
    ],
    inclusions: {
      type: [String],
      required: true,
    },
    exclusions: {
      type: [String],
      required: true,
    },
    tourPrice: [
      {
        numberPerson: {
          type: Number,
          required: true,
        },
        pricePerPerson: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Tour", tourSchema);
