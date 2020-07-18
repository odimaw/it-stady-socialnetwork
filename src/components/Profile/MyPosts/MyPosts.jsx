import React from 'react';
import s from './MyPosts.module.css';
import Posts from './Posts/Post';

const MyPosts = (props) => {

  let postsElements = props.posts
    .map(p => <Posts message={p.message} likesCount={p.likesCount} key={p.id} />);

  // let newPostElement = React.createRef();

  let onAddPost = () => {
    props.addPost();
    // props.dispatch(addPostActionCreator());
  }

  let onPostChange = (e) => {
    let body = e.target.value;
    props.updateNewPostBodyCreator(body);
  }

  return (<div className={s.postsBlock}>
    <h3>My posts</h3>
    <div>
      <div>
        <textarea 
        // ref={newPostElement}
          onChange={onPostChange}
          value={props.newPostText} />
      </div>
      <div><button onClick={onAddPost}>Add post</button></div>
    </div>
    <div className={s.posts}>
      {postsElements}
    </div>
  </div>)
};

export default MyPosts;
