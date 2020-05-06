import React, { Component } from 'react';
import Button from '../../../components/Ui/Button/Button';
import styles from "./Contactdata.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/Ui/Spinner/Spinner";
import Input from "../../../components/Ui/Input/Input"

class ContantData extends Component {
  
  state = {
    orderForm : { 
            name: {
                elementType: "input" ,
                elementConfig: {
                    type: 'text' ,
                    placeholder: "Your Name" ,
                    required: "required"

                },
                value: ""
            } ,
            Street: {
                elementType: "input" ,
                elementConfig: {
                    type: 'text' ,
                    placeholder: "Street" ,
                    required: "required"

                },
                value: ""
            }, 
            zipCode: {
                elementType: "input" ,
                elementConfig: {
                    type: '' ,
                    placeholder: "Zip Code" ,
                    required: "required"

                },
                value: ""
            },
             mob: {
                elementType: "input" ,
                elementConfig: {
                    type: 'tel' ,
                    placeholder: "Mobile Number" ,
                    required: "required"

                },
                value: ""
            },
             email: {
                elementType: "input" ,
                elementConfig: {
                    type: 'email' ,
                    placeholder: "Your Email" ,
                    required: "required"

                },
                value: ""
            } ,
             deliveryMethod:{
                elementType: "select" ,
                elementConfig: {
                  options: [
                      {value: 'fastest', displayValue: "Fastest"} ,
                      {value: 'chepest', displayValue: "Chepest"} ,
                    ]

                },
                value: ""
            }
    
     
    }
    ,loading: false
}
  
    onClickHandler=(event)=> {
        event.preventDefault();
       // console.log(this.props.ingredients) 
       this.setState({ loading: true })
       
       const formData = {};

        for (let formValue in this.state.orderForm) {
            formData[formValue] = this.state.orderForm[formValue].value;
        }

       const order = {
           ingredients : this.props.ingredients ,
           price: this.props.price ,
           userData : formData
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


    onChnageHandler=(event, identider) =>{
       const updateOrderForm = {
           ...this.state.orderForm
       };

       const updatedFormElement = {
           ...updateOrderForm[identider]
       };

       updatedFormElement.value = event.target.value;
      
       
       updateOrderForm[identider] = updatedFormElement;
       
       console.log(updateOrderForm)
       this.setState({ orderForm: updateOrderForm})
    };

    render() {
    
    const formElementArray = [];

        for( let key in this.state.orderForm ) {
            formElementArray.push( {
                id: key ,
                config: this.state.orderForm[key]
            } );
        }

    console.log(formElementArray)
      let form = ( <form  onSubmit={this.onClickHandler}>

        {formElementArray.map(formElement => (
          <Input 
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
           
          changed={(event)=> this.onChnageHandler(event , formElement.id)}
          />
        ))}

        <Button btnType="Success">ORDER</Button>
    </form>);

      if(this.state.loading) {
         form = <Spinner />; 
      }
        return (
            <div className={styles.ContactData}>
            <h3 className={styles.ContactText}>Enter your Contact Data</h3>         
              {form}
            </div>
        )
    }
} 

export default ContantData;