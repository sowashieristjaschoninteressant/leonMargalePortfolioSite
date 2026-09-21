'use server'
import { HeroSection } from "./HeroSection";
import { PortfolioSection } from "./PortfolioSection";
import styles from "./Portfolio.module.css";

export async function PortfolioOverlay() {
    return (
        <div className={styles.overlay}>
            <HeroSection />

            <div className={styles.sectionSpacer} />

            <PortfolioSection
                id="about"
                number="01"
                label="About"
                title="Behind the code"
                side="left"
                accent="pink"
            >
                <div className={styles.aboutGrid}>
                    <div className={styles.aboutText}>
                        <p>
                            I’m a software developer with experience
                            across backend, embedded and web development.
                        </p>

                        <p>
                            I’m particularly interested in systems
                            programming—work where performance,
                            correctness and understanding what happens
                            beneath an abstraction matter.
                        </p>

                        <p>
                            Outside of programming, I enjoy sailing and
                            exploring unfamiliar technical territory.
                        </p>
                    </div>

                    <div className={styles.skills}>
                        <p className={styles.contentLabel}>
                            Technologies
                        </p>

                        <ul className={styles.skillList}>
                            <li>C</li>
                            <li>C++</li>
                            <li>Java</li>
                            <li>C#</li>
                            <li>TypeScript</li>
                            <li>Linux</li>
                        </ul>
                    </div>
                </div>
            </PortfolioSection>

            <div className={styles.sectionSpacer} />

            <PortfolioSection
                id="work"
                number="02"
                label="Selected work"
                title="Things I’ve built"
                side="right"
                accent="blue"
            >
                <div className={styles.projectList}>
                    <article className={styles.project}>
                        <div className={styles.projectHeader}>
                            <span className={styles.projectNumber}>
                                01
                            </span>

                            <h3>HNSW in C</h3>
                        </div>

                        <p>
                            Implementation and benchmarking of the
                            Hierarchical Navigable Small World algorithm
                            for approximate nearest-neighbour search.
                        </p>

                        <div className={styles.tags}>
                            <span>C</span>
                            <span>Algorithms</span>
                            <span>Performance</span>
                        </div>
                    </article>

                    <article className={styles.project}>
                        <div className={styles.projectHeader}>
                            <span className={styles.projectNumber}>
                                02
                            </span>

                            <h3>Systems Programming</h3>
                        </div>

                        <p>
                            Extensions for xv6, an LC-3 virtual machine
                            in C++ and experiments with Windows kernel
                            development through a KMDF driver.
                        </p>

                        <div className={styles.tags}>
                            <span>C/C++</span>
                            <span>xv6</span>
                            <span>Kernel</span>
                        </div>
                    </article>

                    <article className={styles.project}>
                        <div className={styles.projectHeader}>
                            <span className={styles.projectNumber}>
                                03
                            </span>

                            <h3>Interactive Portfolio</h3>
                        </div>

                        <p>
                            A custom Canvas environment with procedural
                            tree generation, autonomous ravens, state
                            machines and exclusive perch allocation.
                        </p>

                        <div className={styles.tags}>
                            <span>TypeScript</span>
                            <span>Canvas</span>
                            <span>Simulation</span>
                        </div>
                    </article>
                </div>
            </PortfolioSection>

            <div className={styles.sectionSpacer} />

            <PortfolioSection
                id="contact"
                number="03"
                label="Contact"
                title="Let’s talk"
                side="left"
                accent="green"
            >
                <div className={styles.contactContent}>
                    <p className={styles.contactLead}>
                        I’m interested in opportunities involving
                        backend engineering, systems software and
                        performance-oriented development.
                    </p>

                    <p>
                        Have a role, project or technical problem you
                        would like to discuss? Feel free to reach out.
                    </p>

                    <div className={styles.contactLinks}>
                        <a href="mailto:YOUR_EMAIL">
                            Email
                            <span aria-hidden="true">↗</span>
                        </a>

                        <a
                            href="YOUR_GITHUB_URL"
                            target="_blank"
                            rel="noreferrer"
                        >
                            GitHub
                            <span aria-hidden="true">↗</span>
                        </a>

                        <a
                            href="YOUR_LINKEDIN_URL"
                            target="_blank"
                            rel="noreferrer"
                        >
                            LinkedIn
                            <span aria-hidden="true">↗</span>
                        </a>
                    </div>
                </div>
            </PortfolioSection>

            <div className={styles.bottomSpace} />
        </div>
    );
}