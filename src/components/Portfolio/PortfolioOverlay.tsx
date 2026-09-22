'use server'
import { HeroSection } from "./HeroSection";
import { PortfolioSection } from "./PortfolioSection";
import styles from "./Portfolio.module.css";
import { ProjectCard } from "./ProjectCard";
import { projects } from "@/src/data/projects";

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
                            I’m particularly interested in backend & systems
                            programming where performance,
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
                            <li>x68 assembly</li>
                            <li>C++</li>
                            <li>Java</li>
                            <li>Spring</li>
                            <li>C#</li>
                            <li>.net</li>
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
                title="Projects"
                side="right"
                accent="blue"
            >
                <div className={styles.projectList}>
                    {projects.map((project, index) => (
                        <ProjectCard key={
                            project.githubUrl ?? project.title}
                            number={String(index + 1).padStart(2, "0")}
                            {...project} />
                    )
                    )}



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
                        <a href="mailto:leon@margale.de">
                            Email
                            <span aria-hidden="true">↗</span>
                        </a>

                        <a
                            href="https://github.com/sowashieristjaschoninteressant"
                            target="_blank"
                            rel="noreferrer"
                        >
                            GitHub
                            <span aria-hidden="true">↗</span>
                        </a>

                        <a
                            href="https://www.linkedin.com/in/leon-margale-881660235/"
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