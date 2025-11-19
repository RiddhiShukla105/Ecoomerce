// import express from 'express';
// import Product from '../models/productSchema.js'

// const router=express.Router();

// //get function

// router.get("/product", async (req, res) => {
//   try {
//     const rec = await Product.findOne({});
//     if (rec && rec.product.length > 0) {
//       return res.status(200).json(rec.product); // send only array
//     } else {
//       return res.status(404).send({ message: "Data not found" });
//     }
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });


// export default router;

import express from 'express';
import Product from '../models/productSchema.js';
import multer from "multer";

const router = express.Router();

// Multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

// CREATE SHOES PRODUCT
router.post("/product", upload.single("image"), async (req, res) => {
  try {
    const { productName, desc, qty, price, category } = req.body;

    const newProduct = new Product({
      productName,
      desc,
      qty,
      price,
      image: req.file ? req.file.filename : null,
      createdAt: new Date(),
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/product", async (req, res) => {
  try {
    const products = await Product.find({});
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
