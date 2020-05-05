import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../Ui/Button/Button'
import styles from "./CheckoutSummary.module.css";

const CheckoutSummary = (props) => {
    return (
        <div className={styles.CheckoutSummary}>
            <h1>LOOKING SO DELICIOUS!</h1>
           
            <div style={{margin: "auto" , width:"100%" }}>
           
             <Burger ingredients={props.ingredients} />
            </div>

                <Button btnType="Danger"
                clicked={props.checkoutCancelled}
                > CENCEL</Button>
                <Button btnType="Success"
                clicked={props.checkoutContinued}
                > CONTINUE</Button>

           
        </div>
    )
}

export default CheckoutSummary
