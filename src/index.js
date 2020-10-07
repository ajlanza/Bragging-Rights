import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { BragContextProvider } from './Components/BragContext'; 
// import './index.css';
import App from './Components/App/App';

ReactDOM.render(
  <BrowserRouter>
    <BragContextProvider>
      <App />
    </BragContextProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
