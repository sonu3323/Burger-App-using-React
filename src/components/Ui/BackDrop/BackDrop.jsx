import React from 'react';
import styles from "./BackDrop.module.css";

function BackDrop(props) {

    return (
        <div>
        {props.show ? <div className={styles.Backdrop} onClick={props.clicked} ></div> : null}
        </div>
    )
}

export default BackDrop;
