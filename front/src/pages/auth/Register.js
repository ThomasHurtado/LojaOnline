import { useContext, useState } from 'react'
import InputMask from 'react-input-mask';

import Input from '../../components/Input'
import styles from './Register.module.css'

//context
import { Context } from '../../context/UserContext'


function Register(){

    const [user, setUser] = useState({})
    const {register} = useContext(Context)

    function hadleChange(e){
        setUser({...user, [e.target.name]: e.target.value})
    }

    function handleSubimit(e){
        e.preventDefault()
        register(user)
    }
    return(
        <section>
            <h1>Registrar conta</h1>
            <form onSubmit={handleSubimit} className={styles.formulario}> 
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite seu nome"
                    hadleOnChange={hadleChange}
                />
                <Input
                    text="Email"
                    type="email"
                    name="email"
                    placeholder="Digite seu email"
                    hadleOnChange={hadleChange}
                />
                <Input
                    text="Telefone"
                    type="phone"
                    name="phone"
                    placeholder="Digite seu telefone"
                    hadleOnChange={hadleChange}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digita seu senha"
                    hadleOnChange={hadleChange}
                />
                <Input
                    text="Confirmar Senha"
                    type="password"
                    name="confirmpassword"
                    placeholder="Cofirme sua senha"
                    hadleOnChange={hadleChange}
                />
                <input type="submit" value="Cadastar"/>
            </form>
        </section>
    )
}

export default Register