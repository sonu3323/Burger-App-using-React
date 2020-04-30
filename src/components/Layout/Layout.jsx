import React, { useState } from 'react';
import Au from "../../hoc/Au";

import styles from "./Layout.module.css";
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SlideDrawer from '../Navigation/SlideDrawer/SlideDrawer';

const  Layout=(props) => {
   
  const [showSiderDrawer , setShowSiderDrawer] = useState(false)
  console.log(showSiderDrawer)

  const SideDrawerClosedHandler = () => {
    setShowSiderDrawer(prevState => !prevState)
  }

  const showSideHandler=()=>{
    
     setShowSiderDrawer(prevState =>  !prevState)
    
  }


   return (
      <Au>
      <Toolbar  menu={showSideHandler}/> 
      <SlideDrawer open={showSiderDrawer} closed={SideDrawerClosedHandler} /> 
    <main className={styles.Content}>
        {props.children}
    </main>
     </Au>
)
};

export default Layout
