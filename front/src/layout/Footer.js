import styles from './Footer.modules.css'

function Footer(){

    return(
        <footer>
            <div className="footer-names">
                <p>
                    Links Github:
                </p>
                <p>
                    <a href='https://github.com/CaioUmeda' target="_blank" rel="noopener noreferrer">Caio</a>
                </p>
                <p>
                    <a href='https://github.com/LsPelegrina' target="_blank" rel="noopener noreferrer">Lucas</a>
                </p>
                <p>
                    <a href='https://github.com/ThomasHurtado' target="_blank" rel="noopener noreferrer">Thomas</a>
                </p>   
            </div>
        </footer>    
    )
}

export default Footer