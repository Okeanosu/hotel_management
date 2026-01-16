import mongoose from "mongoose";
const { Schema } = mongoose;

const bannerSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    image: [
      {
        type: Schema.Types.ObjectId,
        ref: "Image",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Banner", bannerSchema);
