import React from 'react';
import styles from "./Input.module.css"; 

const Input = (props) => {
    
    console.log(props)
    
    let inputElement = null;

    switch(props.elementType) {

        case ("input"):
        inputElement = <input className={styles.Input} 
        {...props.elementConfig} value={props.value}
        onChange={props.changed}
        />
        break;

        case ("tel"):
        inputElement = <input className={styles.Input} 
        {...props.elementConfig} value={props.value}
        onChange={props.changed}
        />
        break;
       
        case ('textarta'):
        inputElement = <textarea className={styles.inputElement} 
        {...props.elementConfig} value={props.value}/>
        break;

        case ('select'):
        inputElement = <select
        className={styles.Input} 
        value={props.value} 
         onChange={props.changed}
         >
        {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
                {option.displayValue}
            </option>
        ))}
        </select>
        break;
        
       default:
        inputElement = <input className={styles.Input} 
        {...props.elementConfig} value={props.value}/>
    }
    
    return (
        <div className={styles.Input}>
            <label className={styles.Label}>{inputElement}</label>
           
        </div>
    )
}

export default Input
