import React, { Component } from 'react';
import Input from "../../components/Ui/Input/Input";
import Button from "../../components/Ui/Button/Button";
import styles from "./Auth.module.css";
import * as actions from "../../store/actions/index";
import { connect } from 'react-redux';
import Spinner from "../../components/Ui/Spinner/Spinner";
import { Redirect } from "react-router-dom"


 class Auth extends Component {
    
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email' ,
                    placeholder: 'Your-Email'
                } ,
                value: '' ,
                validaiton: {
                    required: true ,
                    isEmail: true
                } ,
                valid: false ,
                touched: false
            } ,
           
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password' ,
                    placeholder: 'Password'
                } ,
                value: '' ,
                validaiton: {
                    required: true ,
                    minLength: 6
                } ,
                valid: false ,
                touched: false
            }
        } ,
        isSignup: true
    };
    

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    };

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    };


    inputChangedHandler =(event , controlName)=>{
        const updateControls = {
            ...this.state.controls ,
            [controlName]: {
                ...this.state.controls[controlName] ,
                value: event.target.value ,
                valid: this.checkValidity(event.target.value , this.state.controls[controlName].validaiton) ,
                touched: true
            }
        }
        this.setState({controls: updateControls});
    };

    submitHnadler=(event)=>{
        event.preventDefault();
        this.props.onauth(this.state.controls.email.value , this.state.controls.password.value, this.state.isSignup)
    };


    swithAuthModeHnadler =() => {
        this.setState(preValue => {
            return {isSignup: !preValue.isSignup}
        })
    };


    
    
    render() {
        
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        
        let form = formElementsArray.map(formElement => (
                <Input 
                    key={formElement.id}
                    elementType={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig}
                    value={formElement.config.value}
                    invalid={!formElement.config.valid}
                    shouldValidate={formElement.config.validation}
                    touched={formElement.config.touched}
                    changed={(event) => this.inputChangedHandler(event, formElement.id)} />
            ));

            if(this.props.loading) {
                form = <Spinner />
            };
       
       let errorMessage = null;

       if(this.props.error) {
           errorMessage = <p style={{color: "red" , fontSize: "22px", textShadow:'0 0px 10px white'}}>
               ERROR: {this.props.error.message}</p>
       }
         
       let authRedirect = null 

       if(this.props.isAthenticated) {
           authRedirect = <Redirect to={this.props.authRedirectPath}  />
       }
         
       return (
            <div className={styles.Auth}>
                {errorMessage}
                {authRedirect}
                <form onSubmit={this.submitHnadler}>
                   {form}
                   <Button btnType="Success" >Submit</Button>
                </form>
             
                <Button clicked= {this.swithAuthModeHnadler} btnType="Danger" >SWITCH TO 
                 {this.state.isSignup? ' SIGN-IN': ' SIGN-UP'}</Button>

            </div>
        )
    }
}



const mapStateToProps = state =>{
return {
    loading: state.auth.loading ,
    error: state.auth.error ,
    isAthenticated: state.auth.token !=null ,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
}
};


const mapDispatchToProps = dispatch => {
    return{
        onauth: (email, password ,isSignup)=> dispatch(actions.auth(email, password ,isSignup)),
        onSetAuthRedirectPath: ()=> dispatch(actions.setAuthRedirectPath('/'))
    };
};




export default connect(mapStateToProps , mapDispatchToProps) (Auth);