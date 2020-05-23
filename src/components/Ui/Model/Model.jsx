import React ,{ useEffect}  from 'react';
import styles from "./Modle.module.css";
import Au from '../../../hoc/Au/Au';
import BackDrop from '../BackDrop/BackDrop';

const Model = props => {
   

 // This Component only render If the props is change ****
  

    // shouldComponentUpdate(nextProps , nextState) {
      
    //     return nextProps.show !== props.show || nextProps.children !==props.children;
    
    // }


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

export default React.memo(Model ,(preProps , nextProps) =>  
  nextProps.show === preProps.show 
  && nextProps.children ===preProps.children
);
