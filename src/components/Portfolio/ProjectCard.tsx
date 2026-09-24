
import styles from "@/src/components/Portfolio/Portfolio.module.css"

type ProjectCardProps = {
    number: string;
    title: string;
    description: string;
    tags: string[];
    githubUrl?: string;
};

export function ProjectCard({
    title,
    description,
    tags,
    githubUrl,
}: ProjectCardProps) {

    const content = (
        <>
            <div className={styles.projectHeader}>
                <div className={styles.projectTitle}>

                    <h3>{title}</h3>
                </div>

                {githubUrl && (
                    <span
                        className={styles.githubIcon}
                        aria-hidden="true"
                    >
                        <svg
                            viewBox="0 0 24 24"
                            width="22"
                            height="22"
                        >
                            <path
                                fill="currentColor"
                                d="M12 .7a11.5 11.5 0 0 0-3.64 22.4c.58.1.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.75.41-1.27.74-1.56-2.57-.29-5.27-1.28-5.27-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.71 5.39-5.29 5.68.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .7Z"
                            />
                        </svg>
                    </span>
                )}
            </div>

            <p className={styles.projectDescription}>
                {description}
            </p>

            {tags.length > 0 && (
                <ul className={styles.tags}>
                    {tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                    ))}
                </ul>
            )}
        </>
    );
    return (
        <article className={styles.project}>
            {githubUrl ? (
                <a
                    className={styles.projectLink}
                    href={githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`View ${title} on GitHub`}
                >
                    {content}
                </a>
            ) : (
                <div className={styles.projectLink}>
                    {content}
                </div>
            )}
        </article>

    );
}