import mongoose from "mongoose";
const { Schema } = mongoose;

const foodSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    descriptions: {
      type: String,
      required: false,
    },
    image: {
      type: Schema.Types.ObjectId,
      ref: "Image",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Food", foodSchema);
