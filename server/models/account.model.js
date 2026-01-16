import mongoose from "mongoose";
const { Schema } = mongoose;

const accountSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: false,
    },
    age: {
      type: Number,
      required: false,
    },
    sex: {
      type: Boolean,
      required: false,
    },
    phone: {
      type: Number,
      required: false,
    },
    descriptions: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Account", accountSchema);
