const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add a Name"],
    },
    number: {
      type: Number,
      required: [true, "Please add a Number"],
      unique: true,
    },
    number2: {
      type: Number,
      required: [true, "Please add a Number"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
