import styles from "../styles/premium.module.css";

export default function Offer() {
  return (
    <section className="container py-5">
      <div className={styles.offer}>
        <h1 className={styles.offerTitle}>
          Premium Sale — 50% OFF
        </h1>

        <p className={styles.offerText}>
          Luxury shopping experience with exclusive discounts.
        </p>

        <button className={styles.offerBtn}>
          Explore Deals
        </button>
      </div>
    </section>
  );
}