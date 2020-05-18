import React from 'react';
import styles from "./Toolbar.module.css";
import Logo from '../../Logo/Logo';
import NavigationItmes from "../Navigationitems/NavigationItems"
import DrawerToggle from '../SlideDrawer/DrawerToggle/DrawerToggle';

const Toolbar=(props)=> (

<header className={styles.Toolbar}>
       <DrawerToggle menu={props.menu} />
        <Logo height="80%" />
       <div className={styles.DesktopOnly}>
       <NavigationItmes iaAuthenticated={props.isAuth} />
    </div>
</header>

);


export default Toolbar
