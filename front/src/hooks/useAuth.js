import api from '../utils/api'
import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import useFlashMessage from './useFlashMessage'

export default function useAuth(){

    const [auth, setAuth] = useState(false)
    const {setFlashMessage} = useFlashMessage()
    const navigate = useNavigate()

    useEffect(() => {

        const token = localStorage.getItem('token')

        if(token){
            try {
                const parsedToken = JSON.parse(token)
                api.defaults.headers.Authorization = `Bearer ${parsedToken}`
                setAuth(true)
            } catch (error) {
                console.error(error)
            }
        }
    }, [])

    async function register(user){

        let msgText = 'Cadastro com sucesso'
        let msgType = 'success'

        try {
            const data = await api.post('/users/register', user).then((response) => {
                return response.data
            })

            authUser(data)
        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)
    }

    async function authUser(data){

        setAuth(true)
        localStorage.setItem('token', JSON.stringify(data.token))

        setTimeout(() => {
            navigate('/home')
          }, 3000) 
    }

    async function login(user){
        let msgText = 'Login realizado com sucesso'
        let msgType = 'success'

        try {
            
            const data = await api.post('/users/login', user).then((response) =>{
                return response.data
            })

            await authUser(data)

        } catch (error) {
            msgText = error.response.data.message
            msgType = 'error' 
        }

        setFlashMessage(msgText, msgType)
    }

    function logout(){
        const msgText = 'Logout realizado com sucesso!'
        const msgType = 'success'

        setAuth(false)
        localStorage.removeItem('token')
        api.default.headers.Authorization = undefined
        navigate('/home')

        setFlashMessage(msgText, msgType)


    }
    return { auth, register, logout, login }
}