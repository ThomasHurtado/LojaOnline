import { Link } from "react-router-dom"
import { useState ,useEffect } from "react"
import api from '../utils/api'
import {Context} from "../context/UserContext"
import { useContext } from 'react'

import styles from './Navbar.module.css'

function Navbar(){
    
    const { user } = useContext(Context)
    
    const [token] = useState(localStorage.getItem('token') || '')

    

      let name;
      if (user && user.name) {
        name = user.name.split(' ')[0];
        
      } else {
        name = 'Usuario'; // or some default value
      }

      if(!user.money){
        user.money = '0,00'
      }

      try {
        user.money = user.money.toFixed(2)
      } catch (error) {
        
      }
    
    return(
        <nav className={styles.navbar}>
            <div className={styles.navbar_text}>
                <p className={styles.navuser}>Olá, {name} </p>
                <Link to ="/home" className={styles.navtext}> Home </Link>
                <div className={styles.navspace}>
                    <Link to ="/profile" className={styles.navtext}> Perfil </Link>
                    <Link to ="/cart" className={styles.navtext}> Carrinho </Link>
                    <Link to ="/money" className={styles.cash}>${user.money}</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar