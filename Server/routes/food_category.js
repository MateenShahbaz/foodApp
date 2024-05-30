import express from "express";
import { CategoryModel } from "../models/food_category.js";

const app = express.Router();

app.post("/foodCategory", async (req, res) => {
  try {
    const categories = await CategoryModel.find({});
    return res.status(400).json({
      success: true,
      categories,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false });
  }
});

export default app;
