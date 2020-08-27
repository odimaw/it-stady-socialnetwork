import React from 'react';
import s from './MyPosts.module.css';
import Posts from './Posts/Post';
import { reduxForm, Field } from 'redux-form';
import { required, maxLengthCreator } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';

const maxLength10 = maxLengthCreator(10);

let AddNewPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name='newPostText' component={Textarea} validate={[required, maxLength10]} placeholder='You message'/>
         
      </div>
      <div><button>Add post</button></div>
    </form>
  )
}
AddNewPostForm = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm);

const MyPosts = (props) => {

  let postsElements = props.posts
    .map(p => <Posts message={p.message} likesCount={p.likesCount} key={p.id} />);

  let onAddPost = (values) => {
    props.addPost(values.newPostText);
  }


  return (<div className={s.postsBlock}>
    <h3>My posts</h3>
<AddNewPostForm onSubmit={onAddPost}/>
    <div className={s.posts}>
      {postsElements}
    </div>
  </div>)
};





export default MyPosts;
