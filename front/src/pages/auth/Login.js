import { useState, useContext } from 'react'

import styles from './Login.module.css'
import Input from '../../components/Input'

import {Context} from '../../context/UserContext'


function Login(){

    const [user, setUser] = useState({})
    const{login} = useContext(Context)

    function hadleChange(e){
        setUser({...user, [e.target.name]: e.target.value})
    }

    function handleSubimit(e){
        e.preventDefault()
        login(user)
    }

    return(
        <section>
            <h1>Entrar na conta</h1>
            <form onSubmit={handleSubimit} className={styles.formulario}> 
                <Input
                    text="Email"
                    type="email"
                    name="email"
                    placeholder="Digite seu email"
                    hadleOnChange={hadleChange}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite sua senha"
                    hadleOnChange={hadleChange}
                />
                <input type="submit" value="Entrar"/>
            </form>
        </section>
    )
}

export default Login