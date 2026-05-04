import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style/transaction.module.css";
import { showToast } from "../utils/cartToast";

export default function TransactionPage() {
    const navigate = useNavigate();

    const [payment, setPayment] = useState("UPI");
    const [upi, setUpi] = useState("");
    const [card, setCard] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvv, setCvv] = useState("");
    const [loading, setLoading] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    const getCartKey = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        return user ? `cart_${user._id}` : "guest_cart";
    };

    useEffect(() => {
        const cart =
            JSON.parse(localStorage.getItem(getCartKey())) || [];

        const checkoutData = JSON.parse(
            localStorage.getItem("checkoutData")
        );

        setCartItems(cart);

        if (checkoutData) {
            setTotal(checkoutData.total);
        }
    }, []);

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    const delivery = subtotal > 0 ? 99 : 0;
    const discount = subtotal > 1000 ? 500 : 0;
    const finalTotal = subtotal + delivery - discount;

    const handlePay = () => {
        if (payment === "UPI" && !upi.trim()) {
            showToast("Enter UPI ID ❌");
            return;
        }

        if (payment === "CARD") {
            if (!card || !expiry || !cvv) {
                showToast("Fill card details ❌");
                return;
            }
        }

        setLoading(true);

        setTimeout(() => {
            localStorage.removeItem(getCartKey());
            localStorage.removeItem("checkoutData");

            showToast("Payment Successful ✅");
            navigate("/success");
        }, 2000);
    };

    return (
        <div className={styles.container}>
            <div className={styles.leftCard}>
                <div className={styles.topHead}>
                    <div className={styles.lock}>🔒</div>

                    <div>
                        <h2>Secure Payment</h2>
                        <p>All transactions are secure and encrypted.</p>
                    </div>
                </div>

                <hr />

                <h3>Choose Payment Method</h3>

                <div className={styles.methodBox}>
                    <div
                        className={`${styles.method} ${payment === "UPI" ? styles.active : ""
                            }`}
                        onClick={() => setPayment("UPI")}
                    >
                        <span>UPI Payment</span>
                        <small>Pay using any UPI app</small>
                    </div>

                    <div
                        className={`${styles.method} ${payment === "CARD" ? styles.active : ""
                            }`}
                        onClick={() => setPayment("CARD")}
                    >
                        <span>Credit / Debit Card</span>
                        <small>Visa, Mastercard, RuPay</small>
                    </div>

                    <div
                        className={`${styles.method} ${payment === "COD" ? styles.active : ""
                            }`}
                        onClick={() => setPayment("COD")}
                    >
                        <span>Cash on Delivery</span>
                        <small>Pay when product arrives</small>
                    </div>
                </div>

                {payment === "UPI" && (
                    <>
                        <h4>UPI Details</h4>

                        <input
                            className={styles.input}
                            placeholder="Enter your UPI ID"
                            value={upi}
                            onChange={(e) => setUpi(e.target.value)}
                        />

                        <div className={styles.greenBox}>
                            ✓ You will be redirected securely.
                        </div>
                    </>
                )}

                {payment === "CARD" && (
                    <>
                        <input
                            className={styles.input}
                            placeholder="Card Number"
                            value={card}
                            onChange={(e) => setCard(e.target.value)}
                        />

                        <div className={styles.rowInput}>
                            <input
                                className={styles.input}
                                placeholder="MM/YY"
                                value={expiry}
                                onChange={(e) => setExpiry(e.target.value)}
                            />

                            <input
                                className={styles.input}
                                placeholder="CVV"
                                value={cvv}
                                onChange={(e) => setCvv(e.target.value)}
                            />
                        </div>
                    </>
                )}

                <button
                    className={styles.payBtn}
                    onClick={handlePay}
                >
                    {loading
                        ? "Processing..."
                        : `Pay ₹${finalTotal}`}
                </button>

                <p className={styles.bottomText}>
                    100% Secure Payments • Easy Returns • Buyer Protection
                </p>
            </div>

            <div className={styles.rightCard}>
                <h2>Order Summary</h2>

                {cartItems.map((item) => (
                    <div
                        key={item._id}
                        className={styles.product}
                    >
                        <div>
                            <h4>{item.name}</h4>
                            <p>Qty: {item.qty}</p>
                        </div>

                        <strong>
                            ₹{item.price * item.qty}
                        </strong>
                    </div>
                ))}

                <hr />

                <div className={styles.priceRow}>
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                </div>

                <div className={styles.priceRow}>
                    <span>Delivery Charges</span>
                    <span>₹{delivery}</span>
                </div>

                <div className={styles.discount}>
                    <span>Discount</span>
                    <span>-₹{discount}</span>
                </div>

                <hr />

                <div className={styles.total}>
                    <span>Total Amount</span>
                    <span>₹{finalTotal}</span>
                </div>

                <div className={styles.saveBox}>
                    🎉 You saved ₹{discount}
                </div>
            </div>
        </div>
    );
}