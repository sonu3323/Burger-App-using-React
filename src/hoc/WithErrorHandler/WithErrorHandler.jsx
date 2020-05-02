import React, { Component } from 'react';
import Model from '../../components/Ui/Model/Model';
import Au from '../Au/Au';



const WithErrorHandler = ( WrappedComponent , axios) => {
    
    
    return class extends Component {
      
        state = {
            error: null
        }
         
        
        componentWillMount(){
           this.reqInterceptors =  axios.interceptors.request.use(req=> {
                this.setState({ error: null });
                return req
            })
            
           this.resinterceptors =  axios.interceptors.response.use(res => res , error=>{
                this.setState({ error: error })
            })
        };


        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resinterceptors);
        }
        
        //HIde the model of Error **
        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render() {
            return (
                <Au>
                  <Model show={this.state.error}
                   modelClosed={this.errorConfirmedHandler}
                   >
                   {this.state.error ? this.state.error.message : null}
                  </Model>
                  <WrappedComponent {...this.props} />
                  </Au>
              ); 
        }
       
    }

}

export default WithErrorHandler;
