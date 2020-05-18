import React, { useState } from 'react';
import Au from "../Au/Au";

import styles from "./Layout.module.css";
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SlideDrawer from '../../components/Navigation/SlideDrawer/SlideDrawer';
import { connect } from 'react-redux';

const  Layout=(props) => {
   
  const [showSiderDrawer , setShowSiderDrawer] = useState(false)

  const SideDrawerClosedHandler = () => {
    setShowSiderDrawer(prevState => !prevState)
  }

  const showSideHandler=()=>{
    
     setShowSiderDrawer(prevState =>  !prevState)
    
  }


   return (
      <Au>
      <Toolbar isAuth={props.isAuthenticated} 
        menu={showSideHandler}/> 
      <SlideDrawer
      isAuth={props.isAuthenticated}
      open={showSiderDrawer} closed={SideDrawerClosedHandler} /> 
    <main className={styles.Content}>
        {props.children}
    </main>
     </Au>
)
};

const mapStateToProps = state =>{
  return {
    isAuthenticated: state.auth.token !=null
  }
}

export default connect(mapStateToProps)(Layout);
