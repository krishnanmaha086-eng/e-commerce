import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styles from "../styles/navbar.module.css";


export default function Navbar() {
    const [search, setSearch] = useState("");
    const [products, setProducts] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const handleLogout = () => {
        localStorage.removeItem("user");
        showToast("Logged out ✅");

        setTimeout(() => {
            window.location = "/";
        }, 800);
    };


    useEffect(() => {
        axios
            .get("http://localhost:5000/api/products")
            .then((res) => setProducts(res.data));

        updateCartCount();

        window.addEventListener("storage", updateCartCount);

        return () =>
            window.removeEventListener(
                "storage",
                updateCartCount
            );
    }, []);

    const updateCartCount = () => {
        const cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        const total = cart.reduce(
            (sum, item) => sum + item.qty,
            0
        );

        setCartCount(total);
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setSearch(value);

        if (!value.trim()) {
            setSuggestions([]);
            return;
        }

        const filtered = products.filter((item) =>
            item.name
                .toLowerCase()
                .includes(value.toLowerCase())
        );

        setSuggestions(filtered.slice(0, 5));
    };

    const handleSearch = () => {
        navigate(`/products?search=${search}`);
        setSuggestions([]);
    };

    return (
        <nav className={`${styles.navbar} navbar`}>
            <div className="container">
                <a href="/" className={styles.brand}>
                    ElectroHub
                </a>

                <div className={styles.searchWrapper}>
                    <input
                        type="text"
                        value={search}
                        onChange={handleChange}
                        className={styles.searchBar}
                        placeholder="Search products..."
                    />

                    <button
                        onClick={handleSearch}
                        className={styles.searchBtn}
                    >
                        <i className="bi bi-search"></i>
                    </button>

                    {suggestions.length > 0 && (
                        <div className={styles.suggestionBox}>
                            {suggestions.map((item) => (
                                <div
                                    key={item._id}
                                    className={styles.suggestionItem}
                                    onClick={() => {
                                        setSearch("");
                                        setSuggestions([]);
                                        navigate(`/product/${item._id}`);
                                    }}
                                >
                                    🔍 {item.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="d-flex align-items-center gap-3">
                    <button
                        className={`btn btn-outline-warning rounded-pill ${styles.iconBtn}`}
                    >
                        <i className="bi bi-heart"></i>
                    </button>

                    <Link
                        to="/cart"
                        className={`btn btn-outline-warning rounded-pill position-relative ${styles.iconBtn}`}
                    >
                        <i className="bi bi-cart3"></i>

                        {cartCount > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {
                        user ? (
                            <div className={styles.userMenu}>
                                <span>👤 {user.name}</span>

                                <button
                                    onClick={handleLogout}
                                    className={styles.logoutBtn}
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className={`btn ${styles.btnGold}`}
                            >
                                Login
                            </Link>
                        )
                    }
                </div>
            </div>
        </nav>
    );
}