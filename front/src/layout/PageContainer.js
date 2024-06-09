import styles from './PageContainer.module.css'

function PageContainer({ children }) {
    return (
      <section className={styles.pagecontainer}>
        {children}
      </section>
    )
}

export default PageContainer