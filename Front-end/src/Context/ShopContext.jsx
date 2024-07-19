import React, { createContext, useEffect, useState } from "react";
import { scroller } from "react-scroll";
// import all_products from "../data/all_products";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {

    const token = localStorage.getItem('token');
    const getSelectNav = sessionStorage.getItem('selectedNav');

    const getDefaultCart = () => {
        let cart = {};
        for (let index = 0; index < 100 + 1; index++) {
            cart[index] = 0;
        }
        return cart;
    };

    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [all_products, setAll_products] = useState([]);
    const [navBar, setNavBar] = useState(getSelectNav)


    const getAllProducts = () => {
        fetch("http://localhost:3000/allproducts")
            .then((response) => response.json())
            .then((data) => {
                setAll_products(data.reverse())
                console.log(data)
            })
    }

    const getCart = () => {
        fetch("http://localhost:3000/getcart", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "auth_token": token,
                'Content-Type': 'application/json',
            },
        }).then((response) => response.json())
            .then((data) => {
                setCartItems(data)
                console.log(data)
            })
    }

    const NavbarSelect = (select) => {
        setNavBar(select)
        sessionStorage.setItem('selectedNav', select)
    }

    const scrollToTop = (id) => {
        scroller.scrollTo(id,
            {
                duration: 500,
                delay: 0,
                smooth: 'easeInOutQuart',
                offset: -100,
                forceIframe: false,
                callback: null,

            })
    }


    useEffect(() => {
        getAllProducts()
        if (token) {
            getCart()
        }
    }, [])




    const addToCart = (id) => {
        setCartItems({ ...cartItems, [id]: cartItems[id] + 1 });

        if (token) {
            fetch('http://localhost:3000/addtocart', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "auth_token": token,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "itemId": id
                })
            }).then(res => res.json())
                .then((data) => {
                    console.log(data)
                })
        }
    };

    const removeFromCart = (id) => {
        if (cartItems[id] > 0) {
            setCartItems({ ...cartItems, [id]: cartItems[id] - 1 });

            if (token) {
                fetch('http://localhost:3000/removefromcart', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        "auth_token": token,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        "itemId": id
                    })
                }).then(res => res.json())
                    .then((data) => {
                        console.log(data)
                    })
            }
        }
    };

    const getTotalCartAmount = () => {
        let total = 0;
        for (const [id, quantity] of Object.entries(cartItems)) {
            if (quantity > 0) {
                let item = all_products.find((product) => product.id === Number(id));
                total += item.new_price * quantity;
            }
        }
        return total;
    };

    const getTotalItemsInCart = () => {
        let totalItems = 0;
        for (const quantity of Object.values(cartItems)) {
            totalItems += quantity;
        }
        return totalItems;
    };

    const contextValue = {
        all_products,
        cartItems,
        navBar,
        scrollToTop,
        NavbarSelect,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        getTotalItemsInCart
    };

    return (
        <ShopContext.Provider value={contextValue}>
            {children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
