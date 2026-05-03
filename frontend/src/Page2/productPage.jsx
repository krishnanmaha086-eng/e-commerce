import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { showToast } from "../utils/cartToast";
import styles from "./style/productDetails.module.css";

export default function ProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [qty, setQty] = useState(1);

    const addToCart = (product, qty = 1) => {
        const user = JSON.parse(
            localStorage.getItem("user")
        );

        const cartKey = user
            ? `cart_${user._id}`
            : "guest_cart";

        let cart =
            JSON.parse(
                localStorage.getItem(cartKey)
            ) || [];

        const existingIndex = cart.findIndex(
            (item) => item._id === product._id
        );

        if (existingIndex !== -1) {
            cart[existingIndex].qty =
                Number(cart[existingIndex].qty) +
                Number(qty);
        } else {
            cart.push({
                ...product,
                qty: Number(qty),
            });
        }

        localStorage.setItem(
            cartKey,
            JSON.stringify(cart)
        );

        window.dispatchEvent(
            new Event("storage")
        );

        showToast(
            `${product.name} added to cart ✅`
        );
    };

    useEffect(() => {
        if (!id) return;

        axios
            .get(`https://mongodb-uri-kcd5.onrender.com/api/products/${id}`)
            .then((res) => setProduct(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    if (!product) return <h2 className="text-center mt-5">Loading...</h2>;

    return (
        <div className={styles.container}>
            <div className={styles.productBox}>
                {/* Image */}
                <div className={styles.imageSection}>
                    <img src={product.image} alt={product.name} />
                </div>

                {/* Details */}
                <div className={styles.detailsSection}>
                    <p className={styles.brand}>{product.brand}</p>

                    <h1>{product.name}</h1>

                    <div className={styles.rating}>
                        ⭐⭐⭐⭐☆ <span>({product.reviews} reviews)</span>
                    </div>

                    <h2 className={styles.price}>₹{product.price}</h2>

                    <p className={styles.description}>
                        {product.description}
                    </p>

                    <div className={styles.info}>
                        <p>
                            <strong>Category:</strong> {product.category}
                        </p>

                        <p>
                            <strong>Stock:</strong>{" "}
                            <span className={styles.stock}>
                                {product.stock > 0
                                    ? `In Stock (${product.stock})`
                                    : "Out of Stock"}
                            </span>
                        </p>
                    </div>

                    <div className={styles.quantity}>
                        <label>Quantity:</label>

                        <input
                            type="number"
                            min="1"
                            max={product.stock}
                            value={qty}
                            onChange={(e) =>
                                setQty(Number(e.target.value))
                            }
                        />
                    </div>

                    <div className={styles.buttons}>
                        <button
                            className={styles.cartBtn}
                            onClick={() => addToCart(product, qty)}
                        >
                            🛒 Add to Cart
                        </button>

                        <Link to="/checkout">
                            <button className={styles.buyBtn}>
                                ⚡ Buy Now
                            </button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    );
}