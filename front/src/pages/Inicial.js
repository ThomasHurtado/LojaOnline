import styles from './Inicial.module.css'
import { Link } from "react-router-dom"

function Inicial(){

    return(
        <section>
            <div className={styles.titulo}>
                Bem-vindo(a) a Loja Online!
            </div>
            <div className={styles.subtitulo}>
                Para começar, efetue o login ou cadastre-se caso não possua conta!
            </div>
            <div className={styles.btn_titulo}>
                <div>
                    Clique aqui para entrar em sua conta
                </div>
                <div>
                    Caso não tenha conta clique aqui
                </div>
            </div>
            <div className={styles.btns}>
                <Link to ="/login" className= {styles.btn}> ENTRAR </Link>
                <Link to ="/register" className={styles.btn}> CADASTRAR </Link>
            </div>
        </section>    
    )
}

export default Inicial