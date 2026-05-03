import styles from "../styles/footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <h4 className={styles.footerBrand}>ElectroHub</h4>
      <p className={styles.footerText}>
        Luxury E-commerce Experience
      </p>
    </footer>
  );
}