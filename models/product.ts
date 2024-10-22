import { Schema, model, models } from "mongoose";

// Helper function to remove commas from price strings and convert to a number
const formatPrice = (priceString: any) => {
  return Number(priceString.replace(/,/g, ""));
};

const productSchema = new Schema({
  imageUrl: {
    type: String,
    required: [true, "Image URL is required"],
  },
  name: {
    type: String,
    required: [true, "Product name is required"],
    unique: true,
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    set: formatPrice,
  },
  quantity:{
    type: Number,
    required: [true, "Quantity is required"]
  }
}, {
  timestamps: true
});

const Product = models.Product || model("Product", productSchema);

export default Product;
