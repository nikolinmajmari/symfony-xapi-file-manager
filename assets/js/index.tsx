import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';

const container = document.getElementById('root')!;
console.log("found",container);
ReactDOM.render( <Provider store={store}>
    <App />
</Provider>,container);



