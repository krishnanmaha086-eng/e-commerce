import styles from '../styles/hero.module.css'
export default function Hero() {
    return (
        <>

            <section className={styles.hero}>
                <div className="container">
                    <div className="row align-items-center">

                        <div className="col-lg-6">
                            <div className={styles.heroContent}>
                                <h1 className={styles.heroTitle}>
                                    Luxury <span className={styles.goldText}>Shopping</span>
                                </h1>

                                <p className={styles.heroDesc}>
                                    Premium gadgets, fashion, accessories and lifestyle products
                                    crafted for modern shopping.
                                </p>

                                <button className={styles.heroBtn}>
                                    Shop Now
                                </button>
                            </div>
                        </div>

                        <div className="col-lg-6 text-center">
                            <img
                                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                                alt="hero"
                                className={styles.heroImage}
                            />
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}