import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import DialogsContainer from './components/Dialogs/DialogsContainer';
import { Route, BrowserRouter } from "react-router-dom";
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/login';


const App = () => {
  return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <Route path='/dialogs' 
          render={ () => <DialogsContainer 
           
            />} />
          <Route path='/profile/:userId?'  
          render={ () => <ProfileContainer 
            // store={props.store}    
            />} />
          <Route path='/news'  render={ () => <News /> } />
          
          <Route path='/music'  render={ () => <Music /> }  />
          <Route path='/settings'  render={ () => <Settings />}  />
          <Route path='/users'  render={ () => <UsersContainer />}  />
          <Route path='/login'  render={ () => <LoginPage /> } />
        </div>
      </div>
  )
}

export default App;
