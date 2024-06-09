import api from '../../utils/api' 
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import styles from './Profile.module.css'

function Profile(){

    const [user, setUSer] = useState({})
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect (() =>{
        api.get('users/checkuser',{
            headers:{
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setUSer(response.data)
        }).catch((error) => {
            console.error(error);
        })
    }, [token])

    

    return(
        
        <section className={styles.profile}>
            <h1>Perfil de {user.name} </h1>
            <div className={styles.profile_container}>
                <Link to ="/home" className={styles.profile_text}> Home </Link>
                <Link to ="/home" className={styles.profile_text}> Hoasasaasme </Link>
            </div>
        </section>
        
        
    )
}

export default Profile