import styles from '@/src/components/Portfolio/Portfolio.module.css'

export function ExternalLinkIcon(){
    return (
        <svg
            className={styles.externalLinkIcon}
            viewBox="0 0 16 16"
            aria-hidden="true"
        >
            <path d="M5 11 11 5" />
            <path d="M6 5h5v5" />
        </svg>
    )
}