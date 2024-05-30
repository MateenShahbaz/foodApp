import mongoose from "mongoose";

const schema = new mongoose.Schema({
  CategoryName: { type: String, required: true },
  name: { type: String, required: true },
  img: { type: String, required: true },
  options: [
    {
      half: { type: Number, required: true },
      full: { type: Number, required: true },
    },
  ],
  description: { type: String, required: true },
});

export const Food_Items = mongoose.model("Food_Items", schema);
