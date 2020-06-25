import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';

const Profile = () => {
    return <div className={s.content}>
        <div>
            <img src='https://images.wallpaperscraft.ru/image/pliazh_palma_okean_127914_300x168.jpg'></img>
        </div>
        <div>
            ava + description
    </div>
        <MyPosts />
    </div>
}

export default Profile;