import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);

    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Failed to update cart.");
      }
    }
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce(
      (total, sizes) =>
        total + Object.values(sizes).reduce((sum, count) => sum + count, 0),
      0
    );
  };

  const updateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { token } }
        );
      } catch (error) {
        console.error("Error updating quantity:", error);
        toast.error("Failed to update quantity.");
      }
    }
  };

  const getUserCart = async () => {
    if (token) {
      try {
        const response = await axios.post(
          `${backendUrl}/api/cart/get`,
          {},
          { headers: { token } }
        );

        if (response.data.success) {
          setCartItems(response.data.cartData);
        }
      } catch (error) {
        console.error("Error fetching user cart:", error);
        toast.error("Failed to fetch cart.");
      }
    }
  };

  const removeFromCart = async (itemId, size) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]?.[size]) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }

    setCartItems(cartData);

    if (token) {
      try {
        const response = await axios.post(
          `${backendUrl}/api/cart/remove`,
          { itemId, size },
          { headers: { token } }
        );

        if (response.data.success) {
          toast.success(response.data.message);
        }
      } catch (error) {
        console.error("Error removing from cart:", error);
        toast.error("Failed to remove item.");
      }
    }
  };

  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [itemId, sizes]) => {
      const product = products.find((product) => product._id === itemId);
      if (!product) return total;

      return (
        total +
        Object.entries(sizes).reduce(
          (sum, [size, count]) => sum + count * product.price,
          0
        )
      );
    }, 0);
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setProducts(response.data.products);
        setFilterProducts(response.data.products);
      } else {
        toast.error("Failed to load products.");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products.");
    }
  };

  const getSearchProducts = () => {
    if (search.trim() === "") {
      setFilterProducts(products);
      return;
    }

    const searchedProducts = products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilterProducts(searchedProducts);
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    getSearchProducts();
  }, [search, products]);

  useEffect(() => {
    if (token) getUserCart();
  }, [token]);

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    navigate("/login");
  };

  return (
    <ShopContext.Provider
      value={{
        token,
        setToken,
        products,
        filterProducts,
        currency,
        delivery_fee,
        search,
        setSearch,
        showSearch,
        setShowSearch,
        addToCart,
        cartItems,
        getCartCount,
        updateQuantity,
        getCartAmount,
        navigate,
        logout,
        removeFromCart,
        backendUrl,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
