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
                        I like to build backend architectures, performance software, exploring
                        systems programming and occasionally make ravens
                        land in procedurally generated trees.
                    </p>
                </div>

                <a className={styles.scrollHint} href="#about">
                    Explore ↓
                </a>

                 <nav
                    className={styles.heroNavigation}
                    aria-label="Portfolio navigation"
                >
                    <a href="#about">
                        <span>01</span>
                        About me
                    </a>

                    <a href="#work">
                        <span>02</span>
                        Projects
                    </a>

                    <a href="#contact">
                        <span>03</span>
                        Get in touch
                    </a>
                </nav>
            </div>
        </section>
    );
}