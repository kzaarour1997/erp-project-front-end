import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import { ModalProvider } from "react-modal-hook";



ReactDOM.render(
  <BrowserRouter>
  <ModalProvider>
    <App />
    </ModalProvider>
  </BrowserRouter>,
  document.getElementById('root')
);


