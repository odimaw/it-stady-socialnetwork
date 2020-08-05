import React from 'react';
import Profile from './Profile';
import * as axios from 'axios';
import { connect } from 'react-redux';
import {  getUserProfile } from '../../redux/profile-reducer';
import { withRouter, Redirect } from 'react-router-dom';
// import { usersAPI } from '../../api/api';

class ProfileContainer extends React.Component {

componentDidMount() {
    let userId = this.props.match.params.userId;
    this.props.getUserProfile(userId);
    // if (!userId) {
    //     userId = 2;
    // }
    
    // usersAPI.getUserId(userId)
    //         .then(data => {
                
    //             this.props.setUserProfile(data);
    //         });
}

    render() {
        if (!this.props.isAuth) return <Redirect to={'/login'} />;

        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state) => ({
 profile: state.profilePage.profile,
 isAuth: state.auth.isAuth
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {getUserProfile}) (WithUrlDataContainerComponent);


