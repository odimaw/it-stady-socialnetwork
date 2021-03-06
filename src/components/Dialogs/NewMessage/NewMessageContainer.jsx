import s from './NewMessage.module.css';
import { actions } from '../../../redux/dialogs-reducer';
import NewMessage from './NewMessage';
import { connect } from 'react-redux';

let mapStateToProps = (state) => {
  return {
    newMessage: state.dialogsPage.newMessage,
  }
}

let mapDispatchToProps = (dispatch) => {
  return {
    addMessageActionCreator: (addNewMessage) => {
      dispatch(actions.addMessageActionCreator(addNewMessage));
    }
  }
}

const NewMessageContainer = connect(mapStateToProps, mapDispatchToProps)(NewMessage);

export default NewMessageContainer;
