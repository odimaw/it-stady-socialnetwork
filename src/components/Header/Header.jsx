import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = (props) => {
    return <header className={s.header}>
        <img src='https://image.shutterstock.com/image-photo/white-transparent-leaf-on-mirror-260nw-1029171697.jpg'></img>
        <div className={s.loginBlock}>
            {props.isAuth ? props.login
            : <NavLink to={'/login'}>Login</NavLink> }
        </div>
    </header>
}

export default Header;