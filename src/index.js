import * as serviceWorker from './serviceWorker';
// import state, { subscribe } from './redux/state';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { addPost } from './redux/state';
import { Route, BrowserRouter } from "react-router-dom";
// import { updateNewPostText } from './redux/state';
// import { addMessage } from './redux/state';
// import { updateNewMessageText } from './redux/state';
import store from './redux/state';

 let rerenderEntireTree = () => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App state={store.getState()} 
          addPost={store.getAddPost()}
          updateNewPostText={store.getUpdateNewPostText()}
          addMessage={store.getAddMessage()}
          updateNewMessageText={store.getUpdateNewMessageText()}
        />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  )
};

rerenderEntireTree(store.getState());

store.subscribe(rerenderEntireTree);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

