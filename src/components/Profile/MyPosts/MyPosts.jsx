import React from 'react';
import s from './MyPosts.module.css';
import Posts from './Posts/Post';

const MyPosts = () => {
    return <div>
        My posts
      <div>
            New posts
      </div>
        <div className={s.posts}>
            <Posts message='Hi, how are you?' like='21' />
            <Posts message="It's my first post" like='24' />
            <Posts />
            <Posts />
            <Posts />

           </div>
    </div>
}

export default MyPosts;