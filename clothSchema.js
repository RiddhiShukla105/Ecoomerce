import mongoose from "mongoose";
const {Schema} =mongoose;

const clothSchema=new Schema({
    id:String,
    productName:String,
    image:String,
    price:Number
});

export default mongoose.model('cloth',clothSchema)