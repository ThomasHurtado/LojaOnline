import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/UserContext";
import styles from "./Navbar.module.css";

function Navbar() {
  const { user } = useContext(Context);
  const [name, setName] = useState("Usuário");
  const [money, setMoney] = useState("0,00");

  useEffect(() => {
    if (user) {
      setName(user.name ? user.name.split(" ")[0] : "Usuário");
      setMoney(user.money ? user.money.toFixed(2) : "0,00");
    }
  }, [user]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_text}>
        <p className={styles.navuser}>Olá, {name}</p>
        <Link to="/home" className={styles.navtext}>
          Home
        </Link>
        <div className={styles.navspace}>
          <Link to="/profile" className={styles.navtext}>
            Perfil
          </Link>
          <Link to="/cart" className={styles.navtext}>
            Carrinho
          </Link>
          <Link to="/money" className={styles.cash}>
            ${money}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
