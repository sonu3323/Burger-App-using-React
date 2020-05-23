import React, { useEffect ,useState } from 'react';
import Model from '../../components/Ui/Model/Model';
import Au from '../Au/Au';



const withErrorHandler = ( WrappedComponent , axios) => {
    
    
    return props => {
      
        const [error , seterror] = useState(null)
        
        const reqInterceptors =  axios.interceptors.request.use(req=> {
                seterror(null);
                return req
        });
            
          const resinterceptors =  axios.interceptors.response.use(res => res , error=>{
                seterror(error)
            })
       


        useEffect(()=>{
            return ()=>{
                axios.interceptors.request.eject(reqInterceptors);
                axios.interceptors.response.eject(resinterceptors);
            };
        }, [reqInterceptors , resinterceptors]);
      
        
        //HIde the model of Error **
       const errorConfirmedHandler = () => {
            seterror(null)
        }

            return (
                <Au>
                  <Model show={error}
                   modelClosed={errorConfirmedHandler}
                   >
                   {error ? error.message : null}
                  </Model>
                  <WrappedComponent {...props} />
                  </Au>
              ); 
        }
       
    

}

export default withErrorHandler;
