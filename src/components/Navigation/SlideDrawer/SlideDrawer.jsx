import React from 'react';
import styles from "./Slider.module.css"
import Logo from "../../Logo/Logo";
import NavigationItems from "../Navigationitems/NavigationItems"
import Au from '../../../hoc/Au/Au';
import Backdrop from "../../Ui/BackDrop/BackDrop"


const SlideDrawer = (props) => {
   let attachedClasses = [styles.SideDrawer , styles.Close]
   
   if(props.open) {
       attachedClasses = [styles.SideDrawer , styles.Open]
   }


    return (
       <Au>
       <Backdrop show={props.open} clicked={props.closed}/>
       <div className={attachedClasses.join(' ')}>
           <div className={styles.Logo}>
            <Logo />
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
        </Au>
    )
}


export default SlideDrawer;
