// import mongoose from "mongoose";
// const {Schema}=mongoose;

// const cartSchema=new Schema({
//     id:String,
//     productName:String,
//     image:String,
//     price:Number
// })

// export default mongoose.model('cart',cartSchema)

import mongoose from "mongoose";
const {Schema}=mongoose;

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      name: String,
      image: String,
      price: Number,
      quantity: { type: Number, default: 1 },
      size: String,
      source: String,
    },
  ],
});

export default mongoose.model("Cart", cartSchema);
