import styles from './Input.module.css'

function Input({type, text, name, placeholder, hadleOnChange, value}){
    return(
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input 
                type={type} 
                name={name} 
                id={name} 
                placeholder={placeholder} 
                onChange={hadleOnChange} 
                value={value}></input>
        </div>
    )
}

export default Input