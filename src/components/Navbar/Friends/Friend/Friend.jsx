import React from 'react';
import s from './Friend.module.css';

const Friend = (props) => {
    return <div className={s.friend}>
        <img src={props.avatar} ></img>
        <div className={s.name}>
            {props.name}
        </div>
    </div>
}

export default Friend;