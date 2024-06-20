import api from '../../utils/api' 
import { useEffect, useState } from "react"

import Input from '../../components/Input'
import styles from './EditProfile.module.css'
import useFlashMessage from '../../hooks/useFlashMessage'



function EditProfile(){

    const [user, setUser] = useState({})
    const {setFlashMessage} = useFlashMessage()
    

    function hadleChange(e){
        setUser({...user, [e.target.name]: e.target.value})
    }

    async function handleSubimit(e){
        e.preventDefault()
        let msgText = 'Valor atualizado com sucesso!'
        let msgType = 'success'
        console.log(user)

        try {
            
            const data = await api.patch(`/users/updateuser/${user._id}`, user, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            }).then((response) =>{
            return response.data
            })

        } catch (error) {
            if (error.response) {
              msgText = error.response.data.message;
            } else {
              msgText = 'Erro desconhecido. Tente novamente mais tarde.';
            }
            msgType = 'error';
            console.log(msgText);
          }

        setFlashMessage(msgText, msgType)

        setTimeout(() => {
            //document.location.reload();
          }, 1500)
    }

    const [token] = useState(localStorage.getItem('token') || '')

    useEffect (() =>{
        api.get('users/checkuser',{
            headers:{
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setUser(response.data)
        }).catch((error) => {
            console.error(error);
        })
    }, [token])

    return(
        
        <section className={styles.editprofile}>
            <h1>Editar Perfil</h1>
            <form onSubmit={handleSubimit} className={styles.formulario}> 
                
                <Input
                    text="Email"
                    type="email"
                    name="email"
                    placeholder="Digite seu email"
                    hadleOnChange={hadleChange}
                    value = {user.email || ''}
                />
                <Input
                    text="Telefone"
                    type="phone"
                    name="phone"
                    placeholder="Digite seu telefone"
                    hadleOnChange={hadleChange}
                    value = {user.phone || ''}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digita sua senha"
                    hadleOnChange={hadleChange}
                />
                <Input
                    text="Confirmar Senha"
                    type="password"
                    name="confirmpassword"
                    placeholder="Cofirme sua senha"
                    hadleOnChange={hadleChange}
                />
                <input type="submit" value="Atualizar"/>
            </form>
        </section>
        
        
    )
}

export default EditProfile