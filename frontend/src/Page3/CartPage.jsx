import { useEffect, useState } from "react";
import styles from "./style/cart.module.css";
import { showToast } from "../utils/cartToast";
import { Link, useNavigate } from "react-router-dom";

export default function CartPage() {
    const [cartItems, setCartItems] =
        useState([]);

    const getCartKey = () => {
        const user = JSON.parse(
            localStorage.getItem("user")
        );

        return user
            ? `cart_${user._id}`
            : "guest_cart";
    };

    const loadCart = () => {
        const cart =
            JSON.parse(
                localStorage.getItem(
                    getCartKey()
                )
            ) || [];

        setCartItems(cart);
    };

    useEffect(() => {
        loadCart();

        window.addEventListener(
            "storage",
            loadCart
        );

        return () =>
            window.removeEventListener(
                "storage",
                loadCart
            );
    }, []);


    const navigate = useNavigate();
    const updateCart = (updatedCart) => {
        setCartItems(updatedCart);

        localStorage.setItem(
            getCartKey(),
            JSON.stringify(updatedCart)
        );

        window.dispatchEvent(
            new Event("storage")
        );
    };

    const increaseQty = (id) => {
        const updated = cartItems.map((item) =>
            item._id === id
                ? {
                    ...item,
                    qty: item.qty + 1,
                }
                : item
        );

        updateCart(updated);
    };

    const decreaseQty = (id) => {
        const updated = cartItems.map((item) =>
            item._id === id
                ? {
                    ...item,
                    qty: Math.max(
                        1,
                        item.qty - 1
                    ),
                }
                : item
        );

        updateCart(updated);
    };

    const handleCheckout = () => {
        if (cartItems.length === 0) {
            showToast("Your cart is empty ❌");
            return;
        }

        navigate("/checkout");
    };

    const removeItem = (id) => {
        const updated =
            cartItems.filter(
                (item) => item._id !== id
            );

        updateCart(updated);

        showToast("Removed from Cart ❌");
    };

    const subtotal = cartItems.reduce(
        (sum, item) =>
            sum + item.price * item.qty,
        0
    );

    const delivery =
        subtotal > 0 ? 99 : 0;

    const total = subtotal + delivery;

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.left}>
                    <h1>
                        My Cart (
                        {cartItems.length})
                    </h1>

                    {cartItems.length === 0 && (
                        <h2>Your cart is empty</h2>
                    )}

                    {cartItems.map((item) => (
                        <div
                            className={
                                styles.cartItem
                            }
                            key={item._id}
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                            />

                            <div
                                className={
                                    styles.details
                                }
                            >
                                <h3>{item.name}</h3>
                                <p>₹{item.price}</p>

                                <div
                                    className={
                                        styles.qtyBox
                                    }
                                >
                                    <button
                                        onClick={() =>
                                            decreaseQty(
                                                item._id
                                            )
                                        }
                                    >
                                        -
                                    </button>

                                    <span>
                                        {item.qty}
                                    </span>

                                    <button
                                        onClick={() =>
                                            increaseQty(
                                                item._id
                                            )
                                        }
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            <button
                                className={
                                    styles.removeBtn
                                }
                                onClick={() =>
                                    removeItem(
                                        item._id
                                    )
                                }
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>

                <div className={styles.right}>
                    <h2>Order Summary</h2>

                    <div className={styles.row}>
                        <span>Subtotal</span>
                        <span>₹{subtotal}</span>
                    </div>

                    <div className={styles.row}>
                        <span>Delivery</span>
                        <span>₹{delivery}</span>
                    </div>

                    <hr />

                    <div
                        className={
                            styles.totalRow
                        }
                    >
                        <span>Total</span>
                        <span>₹{total}</span>
                    </div>

                    <button onClick={handleCheckout}>
                        Proceed to Checkout
                    </button>

                </div>
            </div>
        </div>
    );
}