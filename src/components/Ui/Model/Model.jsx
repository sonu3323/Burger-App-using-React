import React ,{ Component }  from 'react';
import styles from "./Modle.module.css";
import Au from '../../../hoc/Au/Au';
import BackDrop from '../BackDrop/BackDrop';

class Model extends Component {
   

 // This Component only render If the props is change ****
    shouldComponentUpdate(nextProps , nextState) {
      
        return nextProps.show !== this.props.show || nextProps.children !==this.props.children;
    
    }


   render(){
   
    return (
       <Au>
        <BackDrop show={this.props.show} 
        clicked={this.props.modelClosed}
        />
        <div className={styles.Modal}
        style={{
            transform: this.props.show ? 'translateY(0)' : 'translate(-100vh)',
            opacity: this.props.show ? '1': '0'
        }}
        >
            {this.props.children}
           
        </div>
        </Au>
    )
}

}

export default Model;
