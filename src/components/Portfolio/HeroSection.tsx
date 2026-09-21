'use server'
import styles from "./Portfolio.module.css";

export async function HeroSection() {
    return (
        <section className={styles.hero}>
            <div className={styles.heroInner}>
                <div className={styles.heroPrimary}>
                    <p className={styles.eyebrow}>
                        Backend & Systems Software Developer
                    </p>

                    <h1>Leon Margale</h1>

                    <p className={styles.heroDescription}>
                        I build performance-minded software, explore
                        systems programming and occasionally make ravens
                        land in procedurally generated trees.
                    </p>
                </div>

                <div className={styles.heroSecondary}>
                    <span>Systems Programming</span>
                    <span>Sailor</span>
                </div>

                <a className={styles.scrollHint} href="#about">
                    Explore ↓
                </a>
            </div>
        </section>
    );
}