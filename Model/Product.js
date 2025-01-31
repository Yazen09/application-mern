const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const ProductSchema = new Schema(
  {
    id_user: { type: String, required: true },
    date: { type: String },
    numserie: { type: String },
    reference: { type: String },
    categorie: { type: String },
    product_img: { type: String },
    cloudinary_id: { type: String },
  },
  { timestamps: true }
);

module.exports = model("Product", ProductSchema);
