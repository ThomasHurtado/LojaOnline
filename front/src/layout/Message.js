import styles from './Message.module.css'
import {useState, useEffect} from 'react'
import bus from '../utils/bus'

function Message(){

    const [visible, setVisible] = useState(false)
    const [message, setMessage] = useState('')
    const [type, setType] = useState("")

    useEffect(() => {

    bus.addListener('flash', ({message, type}) => {

        setVisible(true)
        setMessage(message)
        setType(type)

        setTimeout(() => {
            setVisible(false)
        }, 3000)
    })
    }, [])

    return(
        visible && (
            <div className={styles.alinhar}>
            <div className={`${styles.message} ${styles[type]}`}>
                {message}
            </div>
            </div>
        )
    )
}

export default Message