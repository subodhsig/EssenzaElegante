import userModel from "../models/userModel.js";

// Add an item to the cart
const addToCart = async (req, res) => {
  const { userId, itemId, size } = req.body;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartData = user.cartData || {};
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }
    cartData[itemId][size] = cartData[itemId][size]
      ? cartData[itemId][size] + 1
      : 1;

    // Update cart in the database
    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

    res.json({ success: true, message: "Item added to cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const updateCart = async (req, res) => {
  const { userId, itemId, size, quantity } = req.body;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartData = user.cartData || {};

    // If the quantity is zero, remove the item
    if (quantity === 0) {
      if (cartData[itemId] && cartData[itemId][size]) {
        delete cartData[itemId][size];
        if (Object.keys(cartData[itemId]).length === 0) {
          delete cartData[itemId];
        }
      }
    } else {
      if (!cartData[itemId]) cartData[itemId] = {};
      cartData[itemId][size] = quantity;
    }

    // Update cart in the database
    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

    res.json({ success: true, message: "Cart updated successfully" });
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

// Get the user's cart data
const getUserCart = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartData = user.cartData || {};

    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Remove an item from the cart
const removeFromCart = async (req, res) => {
  const { userId, itemId, size } = req.body;

  try {
    const user = await userModel.findById(userId);

    if (!user) {
      console.error(`User with ID ${userId} not found`);
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    let cartData = user.cartData || {};

    if (cartData[itemId] && cartData[itemId][size]) {
      delete cartData[itemId][size];

      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }

      await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

      return res.json({
        success: true,
        message: "Item removed from cart",
      });
    } else {
      console.error(
        `Item or size not found in cart for user ${userId}, item: ${itemId}, size: ${size}`
      );
      return res.status(404).json({
        success: false,
        message: "Item or size not found in cart",
      });
    }
  } catch (error) {
    console.error(
      `Error occurred while removing item from cart for user ${userId}:`,
      error
    );
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { addToCart, getUserCart, updateCart, removeFromCart };
