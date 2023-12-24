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
    const [selectedTab, setSelectedTab] = useState(0);
    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    //đây là cart
    const [orderedProducts, setOrderedProducts] = useState([]);
    useEffect(() => {
        const productData = {
            category: "Lẩu",
            id: 3,
            name: "Lẩu Chua Cá Linh - Bông Điên Điển",
            image: "/public/image/produce/Combo/Combo Họp Mặt 1.jpg",
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
        orderedProducts,
        selectedTab,
        setSelectedTab,
        handleTabChange,
        setIsLoggedIn,
        setOrderedProducts,
        handleLogout,
        handleDecreaseQuantity,
        handleIncreaseQuantity,
        handleUpdateQuantity,
        calculateTotalPrice,
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
