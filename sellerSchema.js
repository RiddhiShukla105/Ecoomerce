import mongoose from 'mongoose';

const sellerSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mob_num:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    gst:{
        type:String,
        required:true
    },
    b_name:{
        type:String,
        required:true
    },
    isBlocked: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model('Seller',sellerSchema);