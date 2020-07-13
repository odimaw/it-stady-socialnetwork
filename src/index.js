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
import store from './redux/redux-store';

let rerenderEntireTree = (state) => {
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter>
        <App store={store}
          state={state} // скорее всего не нужен
          dispatch={store.dispatch.bind(store)}
        // addPost={store.getAddPost().bind(store)}
        // updateNewPostText={store.getUpdateNewPostText().bind(store)}
        // addMessage={store.getAddMessage().bind(store)}
        // updateNewMessageText={store.getUpdateNewMessageText().bind(store)}
        />
      </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
  )
};

rerenderEntireTree(store.getState());

store.subscribe(() => {
  let state = store.getState();
  rerenderEntireTree(state);
}
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

