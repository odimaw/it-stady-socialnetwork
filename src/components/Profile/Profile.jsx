import React from 'react';
import s from './Profile.module.css';
import MyPosts from './MyPosts/MyPosts';
import ProfileInfo from './ProfileInfo/ProfileInfo';

const Profile = () => {
    return (<div>
        <ProfileInfo />

        <MyPosts posts={posts}  />
    
    </div>)
}

export default Profile;

let posts =[
    {id: 1, message: 'Hi, how are you?', likesCount: 12},
    {id: 2, message: "It's my first post", likesCount: 24 },
    {id: 3, message: 'Yo', likesCount: 4 },
    {id: 4, message: 'Yo', likesCount: 24 },
    {id: 5, message: 'Yo', likesCount: 24 },
    {id: 6, message: 'Yo', likesCount: 24 },
  ];

