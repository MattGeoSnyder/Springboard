import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Nav from './Components/Nav';
import { Provider } from 'react-redux';
import store from './store/store';
import { fetchPosts } from './store/reducers/posts';

const root = ReactDOM.createRoot(document.getElementById('root'));

store.dispatch(fetchPosts());

root.render(
    <Provider store={store}> 
      <BrowserRouter>
        <Nav />
        <App />
      </BrowserRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
