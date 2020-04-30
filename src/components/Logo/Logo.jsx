import React from 'react';
import burgerImage from "../../assets/images/original.png"
import styles from "./Logo.module.css"

const Logo=(props)=> (
    <div className={styles.Logo} style={{height: props.height}}>
    <img src={burgerImage} alt="logo"
    />
    </div>
);

export default Logo
