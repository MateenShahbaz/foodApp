import express from "express";
import { Food_Items } from "../models/food_items.js";
const app = express.Router();

app.post("/getItems", async (req, res) => {
  try {
    const items = await Food_Items.find({});
    return res.status(200).json({
      success: true,  
      items,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false });
  }
});

export default app;
