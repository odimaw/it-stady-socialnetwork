import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import News from './components/News/News';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginPage from './components/Login/login';
import { connect } from 'react-redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import { compose } from 'redux';
// import ProfileContainer from './components/Profile/ProfileContainer';
// import DialogsContainer from './components/Dialogs/DialogsContainer';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends Component {
  catchAllUnhandledErrors = (reason, promise) => {
    alert('Some error occured');
  
  }
  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }
  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
  }
  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />
        <div className='app-wrapper-content'>
          <React.Suspense fallback={<Preloader />}>
            <Switch>
            <Route exact path='/'
                render={() => <Redirect to={'/profile'} />} />
              <Route path='/dialogs'
                render={() => <DialogsContainer />} />
              <Route path='/profile/:userId?'
                render={() => <ProfileContainer />} />
              <Route path='/news' render={() => <News />} />
              <Route path='/music' render={() => <Music />} />
              <Route path='/settings' render={() => <Settings />} />
              <Route path='/users' render={() => <UsersContainer />} />
              <Route path='/login' render={() => <LoginPage />} />
              <Route path='*' render={() => <div>404 NOT FOUND</div>} />
            
            </Switch>
          </React.Suspense>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp }))(App);
