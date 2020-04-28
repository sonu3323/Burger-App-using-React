import React from 'react';
import styles from "./Modle.module.css";
import Au from '../../../hoc/Au';
import BackDrop from '../BackDrop/BackDrop';

function Model(props) {
    return (
       <Au>
        <BackDrop show={props.show} 
        clicked={props.modelClosed}
        />
        <div className={styles.Modal}
        style={{
            transform: props.show ? 'translateY(0)' : 'translate(-100vh)',
            opacity: props.show ? '1': '0'
        }}
        >
            {props.children}
           
        </div>
        </Au>
    )
}

export default Model;
