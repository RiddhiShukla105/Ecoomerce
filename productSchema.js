// import { Schema, model } from 'mongoose';
// import mongoose from "mongoose";

// const productSchema=new Schema({
    
//     productName: {
//         type:String,
//         required:true
//     },
//     category:{
//         type:String,
//         required:true,
        
//     },
//     price:{
//         type:Number,
//         required:true
//     },
//     desc:{
//         type:String,
//         required:true
//     },
//     file:{
//         type:String,
//         required:true
//     }
// })
// export default mongoose.model('product',productSchema);

// models/productSchema.js
import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
  id: String,
  productName: String,
  category: String,
  price: Number,
  qty: Number,
  desc: String,
  image: String,
  quantity: String,
  releasedAt: String,
  colorway: String,
  sku: String,
  createdAt: String,
  updatedAt: String,
  brand: Object
});


export default mongoose.model('product', productSchema, 'products');
