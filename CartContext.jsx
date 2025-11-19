// import React, { createContext, useState, useEffect } from "react";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   //Whatever you wrap inside <CartProvider> ... </CartProvider> (like your whole app) will have access to the cart data.
//   const [cartItems, setCartItems] = useState(() => {
//     // Load cart from localStorage when app starts
//     const savedCart = localStorage.getItem("cartItems");
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   // Whenever cart changes, update localStorage
//   useEffect(() => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItems));
//   }, [cartItems]);

//   // Add item to cart
//   const addToCart = (item) => {
//     const exists = cartItems.find((i) => i.id === item.id);
//     if (exists) {
//       setCartItems(
//         cartItems.map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
//         )
//       );
//     } else {
//       setCartItems([...cartItems, { ...item, quantity: 1 }]);
//     }
//   };

//   // Increase quantity
// const increaseQuantity = (id) => {
//   setCartItems(
//     cartItems.map((item) =>
//       item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//     )
//   );
// };

// // Decrease quantity
// const decreaseQuantity = (id) => {
//   setCartItems(
//     cartItems.map((item) =>
//       item.id === id && item.quantity > 1
//         ? { ...item, quantity: item.quantity - 1 }
//         : item
//     )
//   );
// };


//   // Remove item
//   const removeFromCart = (id) => {
//     setCartItems(cartItems.filter((i) => i.id !== id));
//   };

//   // Clear cart
//   const clearCart = () => setCartItems([]);

//   return (
//     <CartContext.Provider
//       value={{ cartItems, addToCart, removeFromCart, clearCart, increaseQuantity,
//     decreaseQuantity }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };







// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const token = localStorage.getItem("token"); // saved after login
//   const [cartItems, setCartItems] = useState([]);

//   // ✅ Fetch cart on load
//   useEffect(() => {
//     if (token) {
//       axios.get("http://localhost:4004/cart", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setCartItems(res.data.items || []))
//       .catch((err) => console.log(err.response?.data || err));
//     }
//   }, [token]);

//   // ✅ Add to cart
//   const addToCart = async (item) => {
//     if (!token) return alert("Please login first!");

//     try {
//       const res = await axios.post(
//         "http://localhost:4004/cart/add",
//         {
//           productId: item._id,
//           name: item.productName,
//           image: item.image,
//           price: item.price,
//           size: item.selectedSize,
//           source: item.source,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setCartItems(res.data.items);
//     } catch (error) {
//       console.log(error.response?.data || error);
//     }
//   };

//   // ✅ Remove item
//   const removeFromCart = async (productId) => {
//     const res = await axios.delete(`http://localhost:4004/cart/${productId}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setCartItems(res.data.items);
//   };

//   // ✅ Clear cart
//   const clearCart = async () => {
//     await axios.delete("http://localhost:4004/cart/clear", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setCartItems([]);
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };







// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const token = localStorage.getItem("token"); // saved after login
//   const [cartItems, setCartItems] = useState([]);

//   const api = axios.create({
//     baseURL: "http://localhost:4004",
//     headers: token ? { Authorization: `Bearer ${token}` } : {},
//   });

//   // Helper: convert backend item -> frontend item
//   const mapBackendItem = (it) => ({
//     id: it.productId?._id || it.productId || String(it._id || ""),
//     productName: it.name || it.productName || "",
//     image: it.image || it.img || "",
//     price: it.price || 0,
//     quantity: it.quantity || 1,
//     size: it.size || "",
//     source: it.source || "",
//   });

//   // Fetch cart on load (or after login)
//   useEffect(() => {
//     if (!token) {
//       setCartItems([]);
//       return;
//     }

//     api.get("/cart")
//       .then((res) => {
//         const items = (res.data.items || []).map(mapBackendItem);
//         console.log("Fetched cart (mapped):", items);
//         setCartItems(items);
//       })
//       .catch((err) => {
//         console.error("Fetch cart error:", err.response?.data || err.message || err);
//         setCartItems([]);
//       });
//   }, [token]);

//   // Add to cart
//   const addToCart = async (item) => {
//     if (!token) {
//       alert("Please login first!");
//       return;
//     }

//     try {
//       const payload = {
//         productId: item._id || item.id, // send the backend product id
//         name: item.productName || item.name,
//         image: item.image,
//         price: item.price,
//         size: item.selectedSize || item.size || "",
//         source: item.source || "product",
//       };

//       const res = await api.post("/cart/add", payload);
//       const items = (res.data.items || []).map(mapBackendItem);
//       setCartItems(items);
//       console.log("Add to cart response (mapped):", items);
//     } catch (error) {
//       console.error("Add to cart failed:", error.response?.data || error.message || error);
//     }
//   };

//   // Remove item
//   const removeFromCart = async (productId) => {
//     try {
//       const res = await api.delete(`/cart/${productId}`);
//       const items = (res.data.items || []).map(mapBackendItem);
//       setCartItems(items);
//     } catch (error) {
//       console.error("Remove cart item failed:", error.response?.data || error.message || error);
//     }
//   };

//   // Clear cart
//   const clearCart = async () => {
//     try {
//       await api.delete("/cart/clear");
//       setCartItems([]);
//     } catch (error) {
//       console.error("Clear cart failed:", error.response?.data || error.message || error);
//     }
//   };

//   // Increase / decrease quantity locally and optionally call backend update endpoint (not implemented backend)
//   // We'll update UI locally and also setCartItems. For persistent change, you should add an endpoint like POST /cart/updateQty
//   const increaseQuantity = (id) => {
//     setCartItems((prev) => prev.map(it => it.id === id ? { ...it, quantity: it.quantity + 1 } : it));
//     // TODO: call backend to persist
//   };
//   const decreaseQuantity = (id) => {
//     setCartItems((prev) => prev.map(it => it.id === id && it.quantity > 1 ? { ...it, quantity: it.quantity - 1 } : it));
//     // TODO: call backend to persist
//   };

//   return (
//     <CartContext.Provider value={{
//       cartItems,
//       addToCart,
//       removeFromCart,
//       clearCart,
//       increaseQuantity,
//       decreaseQuantity
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // ✅ Watch for token changes (login/logout in other tabs)
  useEffect(() => {
  const handleLogin = () => {
    const newToken = localStorage.getItem("token");
    setToken(newToken);
  };

  window.addEventListener("login", handleLogin);
  return () => window.removeEventListener("login", handleLogin);
}, []);


  //  Fetch cart only when token exists
  useEffect(() => {
    const fetchCart = async () => {
      if (!token) return; // wait until token is ready

      try {
        const res = await axios.get("http://localhost:4004/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Fetched cart:", res.data);
        setCartItems(res.data.items || []);
        localStorage.setItem("cartItems", JSON.stringify(res.data.items || []));
      } catch (err) {
        console.error("Error fetching cart:", err.response?.data || err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("cartItems");
          setCartItems([]);
          alert("Session expired. Please login again.");
          window.location.href = "/login";
        }
      }
    };

    fetchCart();
  }, [token]); // ✅ run again when token changes

  // ✅ Add item to cart
  const addToCart = async (item) => {
    const currentToken = localStorage.getItem("token");
    if (!currentToken) {
      alert("Please login first!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:4004/cart/add",
        {
          productId: item._id || item.id,
          name: item.productName,
          image: item.image,
          price: item.price,
          size: item.selectedSize,
          source: item.source,
        },
        { headers: { Authorization: `Bearer ${currentToken}` } }
      );

      setCartItems(res.data.items);
      localStorage.setItem("cartItems", JSON.stringify(res.data.items));
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        setCartItems([]);
        alert("Session expired. Please login again.");
        window.location.href = "/login";
      }
    }
  };


  // ✅ Remove item
const removeFromCart = async (productId, size, source) => {
  try {
    const token = localStorage.getItem("token");

    const res = await axios.delete(
      `http://localhost:4004/cart/${productId}?size=${size}&source=${source}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // console.log("Updated cart:", res.data.items);
    setCartItems(res.data.items);
  } catch (error) {
    console.error("Error removing item:", error);
  }
};



  // ✅ Clear entire cart
  const clearCart = async () => {
    const currentToken = localStorage.getItem("token");
    if (!currentToken) return;

    try {
      await axios.delete("http://localhost:4004/cart/clear", {
        headers: { Authorization: `Bearer ${currentToken}` },
      });
      setCartItems([]);
      localStorage.removeItem("cartItems");
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

   
 const increaseQuantity = (productId, size, source) => {
  setCartItems((prev) =>
    prev.map(it =>
      it.productId === productId && it.size === size && it.source === source
        ? { ...it, quantity: it.quantity + 1 }
        : it
    )
  );
};

const decreaseQuantity = (productId, size, source) => {
  setCartItems((prev) =>
    prev.map(it =>
      it.productId === productId && it.size === size && it.source === source && it.quantity > 1
        ? { ...it, quantity: it.quantity - 1 }
        : it
    )
  );
};

  const logoutCart = () => {
  setCartItems([]);
  localStorage.removeItem("cartItems");
  localStorage.removeItem("token");
  setToken(null);
};


  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        logoutCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
