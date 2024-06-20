import styles from './Input.module.css'
import InputMask from 'react-input-mask';

function Input({type, text, name, placeholder, hadleOnChange, value}){
    return (
        <div className={styles.form_control}>
          <label htmlFor={name}>{text}:</label>
          {type === 'phone' ? (
            <InputMask
              mask="(99) 99999-9999"
              type="tel"
              name={name}
              id={name}
              placeholder={placeholder}
              onChange={hadleOnChange}
              value={value}
            />
          ) : (
            <input
              type={type}
              name={name}
              id={name}
              placeholder={placeholder}
              onChange={hadleOnChange}
              value={value}
            />
          )}
        </div>
      )
}

export default Input