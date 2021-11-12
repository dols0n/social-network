import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from './redux/redux-store'
import './index.css';
import AppContainer from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";


//let rerenderEntireTree = () => {
ReactDOM.render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>,
    document.getElementById('root')
);
//}
//rerenderEntireTree()








// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
