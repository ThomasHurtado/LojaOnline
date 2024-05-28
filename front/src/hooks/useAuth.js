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
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuth(true)
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

        navigate('/home')
    }

    return { auth, register }
}