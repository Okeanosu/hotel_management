import mongoose from "mongoose";
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    text: {
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Post", postSchema);
