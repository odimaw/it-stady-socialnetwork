import React from 'react';
import Profile from './Profile';
import * as axios from 'axios';
import { connect } from 'react-redux';
import {  getUserProfile } from '../../redux/profile-reducer';
import { withRouter, Redirect } from 'react-router-dom';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
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
        

        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state) => ({
 profile: state.profilePage.profile
 
});

export default compose(
    connect(mapStateToProps, {getUserProfile}),
    withRouter,
    withAuthRedirect
)(ProfileContainer);


// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);





// let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent);

// export default connect(mapStateToProps, {getUserProfile}) (WithUrlDataContainerComponent);


