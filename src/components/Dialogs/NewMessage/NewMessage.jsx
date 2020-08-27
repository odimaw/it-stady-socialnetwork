import React from 'react';
import s from './NewMessage.module.css';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../../common/FormsControls/FormsControls';
import { required, maxLengthCreator } from '../../../utils/validators/validators';

const NewMessage = (props) => {

  let addNewMessage = (values) => {
    props.addMessageActionCreator(values.newMessageBody);
  }

  return (<div className={s.postsBlock}>
    <h3>My message</h3>
    <div>
      <AddMessageFormRedux onSubmit={addNewMessage} />
    </div>
  </div>)
};

const maxLength = maxLengthCreator(50);

const addMessageForm = (props) => {
  return (<form onSubmit={props.handleSubmit}>
    <div>
      <Field component={Textarea} validate={[required, maxLength]}
        name='newMessageBody' placeholder='Enter your message' />

      <button>Add message</button></div>
  </form>
  )
}

const AddMessageFormRedux = reduxForm({ form: 'dialogAddMessageForm' })(addMessageForm)
export default NewMessage;
