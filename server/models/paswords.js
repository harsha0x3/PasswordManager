import mongoose from "mongoose";
const PasswordSchema = new mongoose.Schema(
  {
    account: {
      type: String,
    },

    password: {
      type: String,
      required: [true, "Enter the password"],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      // required: [true, "userId is required"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Password", PasswordSchema);
