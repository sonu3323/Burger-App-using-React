import axios from "axios" ;

 const instance= axios.create({
    baseURL:"https://react-my-burger-547ea.firebaseio.com/"
   
});

export default instance;