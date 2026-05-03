import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/navbar.module.css";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = products.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filtered.slice(0, 5));
  };

  const handleSearch = () => {
    if (search.trim()) {
      navigate(`/products?search=${search}`);
      setSuggestions([]);
    }
  };

  const handleSelect = (item) => {
    setSearch(item.name);
    setSuggestions([]);
    navigate(`/product/${item._id}`);
  };

  return (
    <nav className={`${styles.navbar} navbar navbar-expand-lg navbar-dark sticky-top`}>
      <div className="container">
        <a href="/" className={styles.brand}>
          ElectroHub
        </a>

        <div className={`mx-auto ${styles.searchWrapper}`}>
          <input
            type="text"
            className={styles.searchBar}
            placeholder="Search products..."
            value={search}
            onChange={handleChange}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />

          <button className={styles.searchBtn} onClick={handleSearch}>
            <i className="bi bi-search"></i>
          </button>

          {suggestions.length > 0 && (
            <div className={styles.suggestionBox}>
              {suggestions.map((item) => (
                <div
                  key={item._id}
                  className={styles.suggestionItem}
                  onClick={() => handleSelect(item)}
                >
                  <div className={styles.leftSide}>
                    <i className="bi bi-search"></i>
                    <span>{item.name}</span>
                  </div>

                  <span className={styles.rightSide}>Product</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="d-flex align-items-center gap-3">
          <button className={`btn btn-outline-warning rounded-pill ${styles.iconBtn}`}>
            <i className="bi bi-heart"></i>
          </button>

          <button className={`btn btn-outline-warning rounded-pill position-relative ${styles.iconBtn}`}>
            <i className="bi bi-cart3"></i>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              0
            </span>
          </button>

          <button className={`btn ${styles.btnGold}`}>Login</button>
        </div>
      </div>
    </nav>
  );
}