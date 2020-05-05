import React, { Component } from 'react';
import Button from '../../../components/Ui/Button/Button';
import styles from "./Contactdata.module.css"

class ContantData extends Component {
  
  state = {
    name: "",
    email: "",
    address: {
        street: "",
        postalCode: ""
     },
  
    }
  
    render() {
        return (
            <div className={styles.ContactData}>
            <h4>Enter your Contact Data</h4>         
            <form>
                <input className={styles.Input} type="text" name="name" placeholder="Your Name" />
                <input className={styles.Input} type="text" name="name" placeholder="Your Name" />
                <input className={styles.Input} type="email" email="email" placeholder="You Email" />
                <input className={styles.Input} type="text" name="street" placeholder="Street" />
                <input className={styles.Input} type="text" name="postal" placeholder="Postal Code" />
                <Button btnType="Success">ORDER</Button>
            </form>
            </div>
        )
    }
} 

export default ContantData;