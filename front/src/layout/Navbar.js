import { Link } from "react-router-dom"
import styles from './Navbar.module.css'

function Navbar(){

    return(
        <nav className={styles.navbar}>
            <Link to ="/login"> Login </Link>
            <Link to ="/"> Home </Link>
        </nav>
    )
}

export default Navbar