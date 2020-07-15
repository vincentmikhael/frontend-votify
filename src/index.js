import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import App from './App';
import {BrowserRouter, HashRouter} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
import './asset/main.css'



ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <HashRouter>
    <App />
      </HashRouter>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
