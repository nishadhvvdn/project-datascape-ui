import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './common/Routes'; 


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
      <App />
  // </React.StrictMode>
);
