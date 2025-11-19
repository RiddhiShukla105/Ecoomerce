import express from 'express';
import Cloth from '../models/clothSchema.js'
import path from 'path'
import multer from "multer";

const router=express.Router();


// Multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// CREATE CLOTH PRODUCT
router.post("/cloth", upload.single("image"), async (req, res) => {
  try {
    const { productName, price } = req.body;

    const cloth = new Cloth({
      productName,
      price,
      image: req.file ? req.file.filename : null,
    });

    await cloth.save();
    res.status(201).json({ message: "Cloth added", cloth });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



router.get("/cloth",async(req,res)=>{
    try{
        const cloths=await Cloth.find({});
        if (cloths.length===0){
            return res.status(400).json({message:"No products found"})
        }
        res.status(200).json(cloths);
    }catch(error){
        return res.status(500).json({error:error.message});
    }
});
export default router;