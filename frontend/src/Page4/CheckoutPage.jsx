import { useState, useEffect } from "react";
import { showToast } from "../utils/cartToast";
import styles from "./style/checkout.module.css";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
    const [cartItems, setCartItems] = useState([]);
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [payment, setPayment] = useState("COD");

    const navigate = useNavigate();

    const getCartKey = () => {
        const user = JSON.parse(
            localStorage.getItem("user")
        );

        return user
            ? `cart_${user._id}`
            : "guest_cart";
    };

    useEffect(() => {
        const cart =
            JSON.parse(
                localStorage.getItem(getCartKey())
            ) || [];

        setCartItems(cart);
    }, []);

    const subtotal = cartItems.reduce(
        (sum, item) =>
            sum + item.price * item.qty,
        0
    );

    const delivery = subtotal > 0 ? 99 : 0;
    const total = subtotal + delivery;

    const placeOrder = () => {
        if (!address.trim()) {
            showToast("Enter address ❌");
            return;
        }

        if (!phone.trim()) {
            showToast("Enter phone number ❌");
            return;
        }

        if (phone.length < 10) {
            showToast(
                "Enter valid phone number ❌"
            );
            return;
        }

        localStorage.setItem(
            "checkoutData",
            JSON.stringify({
                address,
                phone,
                payment,
                total
            })
        );

        navigate("/transaction");
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                {/* Left */}
                <div className={styles.left}>
                    <h1>Checkout</h1>

                    <input
                        type="text"
                        placeholder="Full Address"
                        value={address}
                        onChange={(e) =>
                            setAddress(e.target.value)
                        }
                    />

                    <input
                        type="text"
                        placeholder="Phone Number"
                        value={phone}
                        onChange={(e) =>
                            setPhone(e.target.value)
                        }
                    />

                    <select
                        value={payment}
                        onChange={(e) =>
                            setPayment(e.target.value)
                        }
                    >
                        <option value="COD">
                            Cash on Delivery
                        </option>
                        <option value="UPI">
                            UPI Payment
                        </option>
                        <option value="CARD">
                            Credit / Debit Card
                        </option>
                    </select>
                </div>

                {/* Right */}
                <div className={styles.right}>
                    <h2>Order Summary</h2>

                    {cartItems.map((item) => (
                        <div
                            key={item._id}
                            className={styles.item}
                        >
                            <span>
                                {item.name} × {item.qty}
                            </span>

                            <span>
                                ₹{item.price * item.qty}
                            </span>
                        </div>
                    ))}

                    <hr />

                    <div className={styles.total}>
                        <span>Total</span>
                        <span>₹{total}</span>
                    </div>

                    <button onClick={placeOrder}>
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
}