import React from 'react';
import { updateNewPostBodyCreator, addPostActionCreator } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';

const MyPostsContainer = (props) => {
  let state = props.store.getState();

  let addPost = () => {
    props.store.dispatch(addPostActionCreator());
  }

  let onPostChange = (body) => {
    let action = updateNewPostBodyCreator(body);
    props.store.dispatch(action);
  }

  return (<MyPosts updateNewPostBodyCreator={onPostChange} 
    addPost={addPost} 
    posts={state.profilePage.posts}
    newPostText={state.profilePage.newPostText}  />)
};

export default MyPostsContainer;
