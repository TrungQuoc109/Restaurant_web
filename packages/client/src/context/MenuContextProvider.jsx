import React, { createContext, useState, useEffect, useContext } from "react";
export const MenuContext = createContext();
import jwt from 'jsonwebtoken';
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
  const [orderedProducts, setOrderedProducts] = useState([]);
  useEffect(() => {
    const productData = {
      category: "Lẩu",
      id: 3,
      name: "Lẩu Chua Cá Linh - Bông Điên Điển",
      image: {
        imageData:
          "/9j/4AAQSkZJRgABAQAAAQABAAD/4gIoSUNDX1BST0ZJTEUAAQ…B65JxWNrfhG/ttOkktmUJLKSCSRkE5+vYf562nyoy5lKR/9k=",
      },
      price: "600000.00",
      quantity: 1,
    };

    setOrderedProducts([...orderedProducts, productData]);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);
  const checkisLoggedIn = () => {
    const jwtToken = localStorage.getItem("jwtToken"); // Thay 'jwtToken' bằng key chứa JWT Token trong Local Storage của bạn
    return jwtToken !== null; // Trả về true nếu jwtToken tồn tại, ngược lại trả về false
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    setIsLoggedIn(false);
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
    const updatedOrderedProducts = [...orderedProducts];
    updatedOrderedProducts.splice(indexToRemove, 1);
    setOrderedProducts(updatedOrderedProducts);
  };

  const handleIncreaseQuantity = (indexToUpdate) => {
    const updatedOrderedProducts = [...orderedProducts];
    updatedOrderedProducts[indexToUpdate].quantity += 1;
    setOrderedProducts(updatedOrderedProducts);
  };

  const handleDecreaseQuantity = (indexToUpdate) => {
    const updatedOrderedProducts = [...orderedProducts];
    if (updatedOrderedProducts[indexToUpdate].quantity > 1) {
      updatedOrderedProducts[indexToUpdate].quantity -= 1;
      setOrderedProducts(updatedOrderedProducts);
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

  const handleAddToCart = (selectedProduct) => {
    const isProductInCart = orderedProducts.find(
      (product) => product.id === selectedProduct.id
    );

    if (isProductInCart) {
      const updatedProducts = orderedProducts.map((product) => {
        if (product.id === selectedProduct.id) {
          return { ...product, quantity: product.quantity + 1 };
        }
        return product;
      });
      setOrderedProducts(updatedProducts);
    } else {
      const updatedOrderedProducts = [
        ...orderedProducts,
        { ...selectedProduct, quantity: 1 },
      ];
      setOrderedProducts(updatedOrderedProducts);
      console.log("Ordered Products:", updatedOrderedProducts);
    }
  };
  const calculateTotalPrice = () => {
    return orderedProducts.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  useEffect(() => {
    let total = 0;
    cartItems.forEach((cartItem) => {
      total += parseFloat(cartItem.price) * cartItem.quantity;
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

        const newTotalPrice =
            totalPrice - removedItem.price * removedItem.quantity;
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
        return items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
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
                            throw new Error(
                                `HTTP error! Status: ${itemResponse.status}`
                            );
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
        <MenuContext.Provider value={contextValue}>
            {children}
        </MenuContext.Provider>
    );
};

export const useMenuContext = () => {
    return useContext(MenuContext);
};
