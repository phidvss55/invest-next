import styles from '../styles/Layout.module.css'
import Nav from '../components/Nav'
import Footer from './Footer'

declare interface ILayoutProps {
  children: any
}

const Layout = ({ children }: ILayoutProps) => {
  return (
    <>
      <Nav />
      <div className={styles.container}>
        <main className={styles.main}>{children}</main>
      </div>

      <Footer />
    </>
  )
}

export default Layout;