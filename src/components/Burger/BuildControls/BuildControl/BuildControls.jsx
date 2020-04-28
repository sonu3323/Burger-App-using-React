import React from 'react';

import styles from "./BuildControls.module.css"

function BuildControls(props) {
    return (
        <div className={styles.BuildControl}>
            <div className={styles.Label}>{props.label}</div>
            <button onClick={props.removeIngredient} 
            className={styles.Less} 
             disabled={props.disabled} >Less</button>
            
            <button onClick={props.moreIngredient} 
            className={styles.More} >More</button>
        </div>
    );
}

export default BuildControls;
