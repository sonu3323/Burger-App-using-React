import React from 'react';
import styles from "./Drawer.module.css";
const DrawerToggle = (props) => {
    return (
        <div className={styles.DrawerToggle} onClick={props.menu}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default DrawerToggle;
