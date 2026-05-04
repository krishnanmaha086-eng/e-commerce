import { useNavigate } from "react-router-dom";
import styles from "../Page6/style/OrderSuccess.module.css";

export default function OrderSuccess() {
    const navigate = useNavigate();

    const orderId =
        "ORD" +
        Math.floor(
            100000 + Math.random() * 900000
        );

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.icon}>✅</div>

                <h1>Order Placed Successfully</h1>

                <p>
                    Thank you for shopping with
                    ElectroHub
                </p>

                <h3>Order ID: {orderId}</h3>

                <button
                    onClick={() => navigate("/")}
                >
                    Continue Shopping
                </button>
            </div>
        </div>
    );
}