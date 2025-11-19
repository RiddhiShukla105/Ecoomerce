import dotenv from "dotenv";
dotenv.config();


import express from "express";
import jwt from "jsonwebtoken";
import Cart from "../models/cartSchema.js";
import Product from "../models/productSchema.js";


const router = express.Router();

// Helper to decode token manually
function getUserIdFromToken(req) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) throw new Error("Token missing");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded.userId;
}





// ✅ Get user's cart
router.get("/cart", async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    let cart = await Cart.findOne({ userId });


    if (!cart) cart = await Cart.create({ userId, items: [] });
    // res.status(200).json(cart);
    console.log("Cart found:", cart);
    res.status(200).json(cart);

  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

// ✅ Add item to cart
// router.post("/cart/add", async (req, res) => {
//   try {
//     const userId = getUserIdFromToken(req);
//     const { productId, name, image, price, size, source } = req.body;

//     let cart = await Cart.findOne({ userId });
//     if (!cart) cart = new Cart({ userId, items: [] });

//     const existingItem = cart.items.find(
//       (item) =>
//         item.productId.toString() === productId &&
//         item.size === size &&
//         item.source === source
//     );

//     if (existingItem) existingItem.quantity += 1;
//     else cart.items.push({ productId, name, image, price, size, source });

//     await cart.save();
//     res.status(200).json(cart);
//   } catch (error) {
//     res.status(401).json({ error: error.message });
//   }
// });

router.post("/cart/add", async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { productId, name, image, price, size, source } = req.body;
    console.log("Decoded userId:", userId);
    console.log("Adding item:", { productId, name, image, price, size, source });

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
      console.log("New cart created for:", userId);
    }

    const existingItem = cart.items.find(
      (item) =>
        item.productId.toString() === productId &&
        item.size === size &&
        item.source === source
    );

    if (existingItem) {
      existingItem.quantity += 1;
      console.log("Quantity increased for existing item");
    } else {
      cart.items.push({ productId, name, image, price, size, source });
      console.log("Item added successfully!");
    }

    await cart.save();
    console.log("Saved Cart:", cart);
    res.status(200).json(cart);
  } catch (error) {
    console.error("Error adding to cart:", error.message);
    res.status(401).json({ error: error.message });
  }
});

// In cartRoutes.js (add below your other routes)
router.post("/cart/sync", async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { items } = req.body;
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { items },
      { new: true }
    );
    res.status(200).json(cart);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});



// ✅ Update quantity of a product
router.put("/cart/update-quantity", async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find((i) => i.productId.toString() === productId);
    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity = quantity;
    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});



// Update quantity for a product
// router.post("/cart/updateQty", async (req, res) => {
//   try {
//     const userId = getUserIdFromToken(req);
//     const { productId, quantity } = req.body;
//     const cart = await Cart.findOne({ userId });
//     if (!cart) return res.status(404).json({ message: "Cart not found" });

//     const item = cart.items.find(i => i.productId.toString() === productId);
//     if (!item) return res.status(404).json({ message: "Item not found" });

//     item.quantity = quantity;
//     await cart.save();
//     res.status(200).json(cart);
//   } catch (error) {
//     res.status(401).json({ error: error.message });
//   }
// });



// ✅ Remove single item
// router.delete("/cart/:productId", async (req, res) => {
//   try {
//     const userId = getUserIdFromToken(req);
//     const { productId } = req.params;

//     const cart = await Cart.findOneAndUpdate(
//       { userId },
//       { $pull: { items: { productId } } },
//       { new: true }
//     );

//     res.status(200).json(cart);
//   } catch (error) {
//     res.status(401).json({ error: error.message });
//   }
// });

router.delete("/cart/:productId", async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    const { productId } = req.params;
    const { size, source } = req.query;

    const cart = await Cart.findOne({ userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    console.log("\n===== DELETE ATTEMPT =====");
    console.log("productId param:", productId);
    console.log("size param:", size);
    console.log("source param:", source);
    console.log("Existing cart items:");
    cart.items.forEach(i =>
      console.log({
        productId: i.productId.toString(),
        size: i.size,
        source: i.source,
      })
    );

    cart.items = cart.items.filter(
      (item) =>
        !(
          item.productId.toString() === productId &&
          item.size === size &&
          item.source === source
        )
    );

    await cart.save();
    console.log("After delete:", cart.items.length);
    res.status(200).json({ items: cart.items });
  } catch (error) {
    console.error("Error deleting item:", error.message);
    res.status(500).json({ error: error.message });
  }
});





// ✅ Clear entire cart
router.delete("/cart/clear", async (req, res) => {
  try {
    const userId = getUserIdFromToken(req);
    await Cart.findOneAndUpdate({ userId }, { items: [] });
    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

export default router;
