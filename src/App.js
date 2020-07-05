import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Navbar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Dialogs from './components/Dialogs/Dialogs';
import { Route, BrowserRouter } from "react-router-dom";
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';



const App = (props) => {
  return (
      <div className='app-wrapper'>
        <Header />
        <Navbar myFriends={props.state.myFriends} />
        <div className='app-wrapper-content'>
          <Route path='/dialogs' 
          render={ () => <Dialogs  
            state = {props.state}
            dialogsPage = {props.state.dialogsPage} 
            dispatch = {props.dispatch}
            // addMessage = {props.addMessage}
            // updateNewMessageText = {props.updateNewMessageText}
            />} />
          <Route path='/profile'  
          render={ () => <Profile 
            profilePage={props.state.profilePage} 
            dispatch = {props.dispatch}
            // addPost={props.addPost} 
            // updateNewPostText={props.updateNewPostText}
            />} />
          <Route path='/news'  render={ () => <News /> } />
          <Route path='/music'  render={ () => <Music /> }  />
          <Route path='/settings'  render={ () => <Settings />}  />
        </div>
      </div>
  )
}

export default App;
