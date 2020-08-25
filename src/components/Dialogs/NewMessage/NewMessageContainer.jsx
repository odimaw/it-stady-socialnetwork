import s from './NewMessage.module.css';
import { addMessageActionCreator, updateNewMessageBodyCreator } from '../../../redux/dialogs-reducer';
import NewMessage from './NewMessage';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
  return {
    newMessage: state.dialogsPage.newMessage,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    updateNewMessageBodyCreator: (body) => {
      dispatch(updateNewMessageBodyCreator(body));
    },
    addMessageActionCreator: () => {
      dispatch(addMessageActionCreator());
    },
  }
}

const NewMessageContainer = connect(mapStateToProps, mapDispatchToProps)(NewMessage);

export default NewMessageContainer;
