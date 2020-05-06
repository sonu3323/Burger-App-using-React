import React, { Component } from 'react';
import Button from '../../../components/Ui/Button/Button';
import styles from "./Contactdata.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/Ui/Spinner/Spinner";

class ContantData extends Component {
  
  state = {
    name: "",
    email: "",
    address: {
        street: "",
        postalCode: ""
     },
     loading: false
    }
  
    onClickHandler=(event)=> {
        event.preventDefault();
       
       // console.log(this.props.ingredients) 
       this.setState({ loading: true })
        const order = {
           ingredients : this.props.ingredients ,
           price: this.props.price ,
           customer: {
               name: "Sonu sharma" ,
               address: {
                   city: 'Ateli ',
                   dist: 'Mohinder Garh',
                   state: "Haryana"
                } ,
                email: "test@gmail.com" ,
                mob: 8708161926
           } ,

        deliveryMethod: "fastest"
       };
       
        axios.post('/orders.json' , order)
        .then((Response=> {
            console.log(Response);
            this.setState({ loading: false });
            this.props.history.push("/");
        }))
        .catch(error=> {
            console.log(error);
            this.setState({ loading:false });
        })
    }



    render() {
      
      let form = ( <form>
        <input className={styles.Input} type="text" name="name" placeholder="Your Name" />
        <input className={styles.Input} type="text" name="name" placeholder="Your Name" />
        <input className={styles.Input} type="email" email="email" placeholder="You Email" />
        <input className={styles.Input} type="text" name="street" placeholder="Street" />
        <input className={styles.Input} type="text" name="postal" placeholder="Postal Code" />
        <Button btnType="Success" clicked={this.onClickHandler}>ORDER</Button>
    </form>);

      if(this.state.loading) {
         form = <Spinner />; 
      }
        return (
            <div className={styles.ContactData}>
            <h4>Enter your Contact Data</h4>         
              {form}
            </div>
        )
    }
} 

export default ContantData;