import { useNavigate } from "react-router-dom";
import styles from "../styles/feature.module.css";

export default function CategorySection() {
  const navigate = useNavigate();

  const categories = [
    "Electronics",
    "Fashion",
    "Shoes",
    "Home",
    "Wearables",
    "Accessories"
  ];

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  return (
    <section className={styles.categorySection}>
      <div className="container text-center">
        <h2 className={styles.title}>
          Shop by Category
        </h2>

        <div className={styles.categoryGrid}>
          {categories.map((item) => (
            <button
              key={item}
              className={styles.categoryBtn}
              onClick={() =>
                handleCategoryClick(item)
              }
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}