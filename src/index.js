import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from "react-router-dom";


const app = (
  <BrowserRouter>
  <App />
  </BrowserRouter> 
);

ReactDOM.render(

  <React.StrictMode>
   {app}
  </React.StrictMode>
 ,
  document.getElementById('root')
);

