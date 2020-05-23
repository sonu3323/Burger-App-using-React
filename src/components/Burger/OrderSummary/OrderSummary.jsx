import React  from 'react'
import Au from '../../../hoc/Au/Au';
import styles from "./OrderSummary.module.css";
import Button from "../../Ui/Button/Button"


const OrderSummary = props => {

   
        const ingredientSummary = Object.keys(props.ingredients)
            .map(igKey => {
                return <li key={igKey}>
                    <span style={{ textTransform: 'capitalize', padding: "0 4%" }}>{igKey}: {props.ingredients[igKey]}</span>
                </li>
            });

        return (
            <Au>
                <h3>Your Order: </h3>
                <p className={styles.PText}>A delicious burger with the following ingredients</p>
                <ul className={styles.List}>
                    {ingredientSummary}
                </ul>
                <p className={styles.totalPrice}>Total Price: {props.price} &#8377;</p>
                <p className={styles.PText}>Continue to checkout?</p>
                <Button btnType="Danger" clicked={props.PurchaseCanceled} >CANCEL</Button>
                <Button btnType="Success" clicked={props.purchaseContinued} >CONTINUE</Button>

            </Au>
        )
    
}


export default OrderSummary;
