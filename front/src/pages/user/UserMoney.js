import { useState ,useEffect } from 'react'
import api from '../../utils/api'
import Input from "../../components/Input"
import { useContext } from 'react'
import { Context } from '../../context/UserContext'
import styles from './UserMoney.module.css'
import useFlashMessage from '../../hooks/useFlashMessage'



function UserMoney(){
    
   
    const [user, setUser] = useState({})
    const [updateduser, setUpdateduser] = useState({})
    const { setFlashMessage } = useFlashMessage()
    const [token] = useState(localStorage.getItem('token') || '')
    const {fetchUser} = useContext(Context)

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

    
      let name;
      if (user && user.name) {
        name = user.name
        
      } else {
        name = 'Usuario'; // or some default value
      }

      if(!user.money){
        user.money = '0,00'
      }
        
    function hadleChange(e){
        setUser({...user, [e.target.name]: e.target.value})
    }

    async function handleSubimit(e){
        e.preventDefault()
        let msgText = 'Valor atualizado com sucesso!'
        let msgType = 'success'

        try {
            
            const data = await api.patch('/users/updatemoneyplus', user).then((response) =>{
                return response.data
            })

            setUpdateduser(data)

            api.get('users/checkuser',{
                headers:{
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            }).then((response) => {
                setUser(response.data)
            }).catch((error) => {
                console.error(error);
            })

        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error' 
        }

        fetchUser()

        setFlashMessage(msgText, msgType)
    }

    function hadleChange2(e){
        setUser({...user, [e.target.name]: e.target.value})
    }

    async function handleSubimit2(e){
        e.preventDefault()
        let msgText = 'Valor atualizado com sucesso!'
        let msgType = 'success'

        try {
            
            const data = await api.patch('/users/updatemoneyminus', user).then((response) =>{
                return response.data
            })

            setUpdateduser(data)

            api.get('users/checkuser',{
                headers:{
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            }).then((response) => {
                setUser(response.data)
            }).catch((error) => {
                console.error(error);
            })

        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error' 
        }

        fetchUser()

        setFlashMessage(msgText, msgType)
    }
    
    return(

        <section>
            <h1>O que deseja fazer,  {name}</h1>
            <div className={styles.updatedMoney}>
            <form onSubmit={handleSubimit} className={styles.formulario} > 
                <Input
                    text="Depositar"
                    type="money"
                    name="money"
                    placeholder="Ex: 100.00"
                    hadleOnChange={hadleChange}
                />
                <input type="submit" value="Confirmar"/>
            </form>
            <form onSubmit={handleSubimit2} className={styles.formulario} > 
                <Input
                    text="Sacar"
                    type="money"
                    name="money"
                    placeholder="Ex: 100.00"
                    hadleOnChange={hadleChange2}
                />
                <input type="submit" value="Confirmar"/>
            </form>
            </div>
        </section>
    )
}

export default UserMoney