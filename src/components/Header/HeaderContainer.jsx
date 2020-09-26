import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { logout } from '../../redux/auth-reducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';

class HeaderContainer extends React.Component {

    // componentDidMount() {
    //     this.props.getAuthUserData();
    // }

    render() {
        return <Header {...this.props} />
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});

export default compose(
    withRouter,
     connect(mapStateToProps, { logout })) (HeaderContainer);