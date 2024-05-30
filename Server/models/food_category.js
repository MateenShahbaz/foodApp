import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    categoryname:{
        type: String,
        required: true
    }
})

export const CategoryModel = mongoose.model('foodCategory', categorySchema);