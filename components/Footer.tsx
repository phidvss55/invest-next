import styles from '../styles/Home.module.css'

declare interface IFooterProps {}

const Footer = (props: IFooterProps) => {
  return (
    <div className={styles.footer}>
      Copyright 2022 Our surving name
    </div>
  )
}

export default Footer;