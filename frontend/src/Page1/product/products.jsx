import { useEffect, useState } from "react";
import axios from "axios";
import styles from "../styles/products.module.css";
import { useLocation, Link } from "react-router-dom";
import { showToast } from "../../utils/cartToast";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const query = new URLSearchParams(location.search);

    const search = query.get("search") || "";
    const category = query.get("category") || "";

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get(
                "https://mongodb-uri-kcd5.onrender.com/api/products"
            );

            setProducts(res.data);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter((item) => {
        const matchSearch = item.name
            .toLowerCase()
            .includes(search.toLowerCase());

        const matchCategory = category
            ? item.category.toLowerCase() === category.toLowerCase()
            : true;

        return matchSearch && matchCategory;
    });

    if (loading) return <h2>Loading...</h2>;

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

    return (
        <section className={styles.productSection}>
            <div className="container py-5">
                <h2 className={styles.productTitle}>
                    {category ? `${category} Products` : "Featured Products"}
                </h2>

                <div className="row g-4">
                    {filteredProducts.map((item) => (
                        <div className="col-lg-3 col-md-6" key={item._id}>
                            <Link
                                to={`/product/${item._id}`}
                                className={styles.link}
                            >
                                <div className={styles.productCard}>
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className={styles.productImg}
                                    />

                                    <div className={styles.productBody}>
                                        <h5>{item.name}</h5>

                                        <p>{item.description}</p>

                                        <div className={styles.productBottom}>
                                            <span>₹{item.price}</span>

                                            <button
                                                className={styles.buyBtn}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    addToCart(item, 1);
                                                }}
                                            >
                                                Add Cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {filteredProducts.length === 0 && (
                    <h3
                        style={{
                            color: "white",
                            textAlign: "center",
                            marginTop: "30px",
                        }}
                    >
                        No products found
                    </h3>
                )}
            </div>
        </section>
    );
}