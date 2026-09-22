import type { ReactNode } from "react";
import styles from "./Portfolio.module.css";

type PortfolioSectionProps = {
    id: string;
    number: string;
    label: string;
    title: string;
    side: "left" | "right";
    accent: "pink" | "blue" | "green";
    children: ReactNode;
};

const sideClasses = {
    left: styles.left,
    right: styles.right,
};

const accentClasses = {
    pink: styles.pink,
    blue: styles.blue,
    green: styles.green,
};

export async function PortfolioSection({
    id,
    number,
    label,
    title,
    side,
    accent,
    children,
}: PortfolioSectionProps) {
    return (
        <section
            id={id}
            className={[
                styles.section,
                sideClasses[side],
                accentClasses[accent],
            ].join(" ")}
        >
            <header className={styles.sectionHeader}>
                <span className={styles.sectionNumber}>
                    {number}
                </span>

                <div>
                    <p className={styles.sectionLabel}>
                        {label}
                    </p>

                    <h2 className={styles.sectionHeading}>
                        {title}
                    </h2>
                </div>
            </header>

            <div className={styles.sectionContent}>
                {children}
            </div>
        </section>
    );
}