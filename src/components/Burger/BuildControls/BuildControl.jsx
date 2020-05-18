import React from 'react'

import BuildControls from './BuildControl/BuildControls';

import styles from "./BuildControl.module.css";

const controls = [
    {label: "Salad" , type: 'salad'} ,
    {label: "Bacon" , type: 'bacon'} ,
    {label: "Cheese" , type: 'cheese'} ,
    {label: "Meat" , type: 'meat'} ,
    
]




function BuildControl(props) {
    return (
        <div className={styles.BuildControls}>
         <p className={styles.name}>@Sonu Sharma {new Date().getFullYear()} </p>
          <p className={styles.para}>Current Price: {props.price} &#8377;</p>
          { controls.map(ctrl => (
              <BuildControls 
            moreIngredient={ ()=> props.ingredientAdded(ctrl.type) }
            removeIngredient = {()=> props.ingredientRemove(ctrl.type)}
            key={ctrl.label}
            label={ctrl.label} 
            disabled = {props.disabled[ctrl.type] }
            />
          )) 
        }
        <button className={styles.OrderButton}
        disabled={!props.purchaseable}
        onClick={props.orderSummary}
        >{ props.isAuth ? 'ORDER NOW': 'Signup To Order' }</button>
        </div>
    );
}

export default BuildControl;
