// import React from 'react';
import { updateNewPostBodyCreator, addPostActionCreator } from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
// import StoreContext from '../../../StoreContext';
import { connect } from 'react-redux';

// const MyPostsContainer = () => {
  // 

//   return (<StoreContext.Consumer>
//     {
//     (store) => {
//       let state = store.getState();
//       let addPost = () => {
//         store.dispatch(addPostActionCreator());
//       }

//       let onPostChange = (body) => {
//         let action = updateNewPostBodyCreator(body);
//         store.dispatch(action);
//       }
//       return <MyPosts updateNewPostBodyCreator={onPostChange}
//         addPost={addPost}
//         posts={state.profilePage.posts}
//         newPostText={state.profilePage.newPostText} />
//     }
//   }
//   </StoreContext.Consumer>)
// };

// export default MyPostsContainer;

let mapStateToProps = (state) => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    updateNewPostBodyCreator: (body) => {
      dispatch(updateNewPostBodyCreator(body));
    },
    addPost: () => {
      dispatch(addPostActionCreator());
    },
  }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps) (MyPosts);

export default MyPostsContainer;