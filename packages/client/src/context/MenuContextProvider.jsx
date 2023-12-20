import React, { createContext, useState, useEffect, useContext } from "react";
export const MenuContext = createContext();

export const MenuContextProvider = ({ children }) => {
  const [products, setMenu] = useState([]);
  const [product, setProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState(() => {
    const storedCartItems = window.localStorage.getItem("cartItems");
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false);
  };

  const handleUserCheckout = () => {
    if (isLoggedIn) {
      window.location.href = "/checkout";
    } else {
      window.location.href = "/login";
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleDrawerOpen = () => {
    setIsCartOpen(true);
  };

  const handleDrawerClose = () => {
    setIsCartOpen(false);
  };

  const handleRemoveItem = (indexToRemove) => {
    const updatedCartItems = [...cartItems];
    const removedItem = updatedCartItems.splice(indexToRemove, 1)[0];

    setCartItems(updatedCartItems);

    const newTotalPrice = totalPrice - removedItem.price * removedItem.quantity;
    setTotalPrice(newTotalPrice);
  };

  const handleIncreaseQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity += 1;

    setCartItems(updatedCartItems);
    updateTotalPrice(updatedCartItems);
    updateLocalStorage(updatedCartItems);
  };

  const handleDecreaseQuantity = (index) => {
    const updatedCartItems = [...cartItems];
    if (updatedCartItems[index].quantity > 1) {
      updatedCartItems[index].quantity -= 1;

      setCartItems(updatedCartItems);
      updateTotalPrice(updatedCartItems);
      updateLocalStorage(updatedCartItems);
    }
  };

  const handleUpdateQuantity = (index, newQuantity) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].quantity = newQuantity;

    setCartItems(updatedCartItems);

    const newTotalPrice = updatedCartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPrice(newTotalPrice);

    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };
  const handleAddToCart = (product) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);

      const newTotalPrice = calculateTotalPrice(updatedCartItems);
      setTotalPrice(newTotalPrice);
    } else {
      const newItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      };
      setCartItems([...cartItems, newItem]);

      const newTotalPrice = calculateTotalPrice([...cartItems, newItem]);
      setTotalPrice(newTotalPrice);
    }
  };

  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  useEffect(() => {
    window.localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    const storedCartItems = window.localStorage.getItem("cartItems");
    setCartItems(storedCartItems ? JSON.parse(storedCartItems) : []);
  }, []);

  useEffect(() => {
    let total = 0;
    cartItems.forEach((cartItem) => {
      total += parseFloat(cartItem.price) * cartItem.quantity;
    });
    setTotalPrice(total.toFixed(3));
  }, [cartItems]);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("http://localhost:8080/menu/");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const menuItems = await Promise.all(
          data.map(async (item) => {
            const itemResponse = await fetch(
              `http://localhost:8080/menu/${item.id}`
            );
            if (!itemResponse.ok) {
              throw new Error(`HTTP error! Status: ${itemResponse.status}`);
            }
            const itemData = await itemResponse.json();
            return {
              ...item,
              image: itemData.image.imageData.toString("base64"),
            };
          })
        );
        setMenu(menuItems);
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);
  const contextValue = {
    products,
    product,
    selectedCategory,
    searchQuery,
    cartItems,
    isCartOpen,
    totalPrice,
    loading,
    isLoggedIn,
    setIsLoggedIn,
    handleLogout,
    handleUserCheckout,
    handleDecreaseQuantity,
    handleIncreaseQuantity,
    handleUpdateQuantity,
    handleSearchChange,
    handleCategoryChange,
    handleDrawerOpen,
    handleDrawerClose,
    handleRemoveItem,
    handleAddToCart,
  };

  return (
    <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
  );
};

export const useMenuContext = () => {
  return useContext(MenuContext);
};
