import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import friendsReducer from "./friends-reducer";



let store = {

  _state: {
    profilePage: {
      posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: "It's my first post", likesCount: 24 },
        { id: 3, message: 'Yo', likesCount: 4 },
        { id: 4, message: 'Yo', likesCount: 24 },
        { id: 5, message: 'Yo', likesCount: 24 },
        { id: 6, message: 'Yo', likesCount: 24 },
      ],
      newPostText: 'it-kamasutra.com',
    },

    dialogsPage: {
      messages: [
        { id: 1, message: 'Hi' },
        { id: 2, message: 'How is your it-kamasutra?' },
        { id: 3, message: 'Yo' },
        { id: 4, message: 'Yo' },
        { id: 5, message: 'Yo' },
        { id: 6, message: 'Yo' },
      ],
      newMessage: '',
      dialogs: [
        { id: 1, name: 'Dimych' },
        { id: 2, name: 'Andrey' },
        { id: 3, name: 'Sveta' },
        { id: 4, name: 'Viktor' },
        { id: 5, name: 'Sasha' },
        { id: 6, name: 'Valera' },
      ],
    },
    myFriends: {
      friends: [
        { id: 1, name: 'Dimych', avatar: 'https://hairstyleman.com/wp-content/uploads/2018/12/24b97606969422054b8dad57759e5caa.jpeg' },
        { id: 2, name: 'Andrey', avatar: 'https://smile.com.ru/wp-content/uploads/2018/11/shutterstock_471137213-1024x683.jpg' },
        { id: 3, name: 'Sveta', avatar: 'https://avatars.mds.yandex.net/get-pdb/1058492/5b6ad5d2-0e1e-449b-b37d-16d599307991/s1200?webp=false' },
        { id: 4, name: 'Viktor', avatar: 'https://avatars.mds.yandex.net/get-pdb/1058492/5b6ad5d2-0e1e-449b-b37d-16d599307991/s1200?webp=false' },
        { id: 5, name: 'Sasha', avatar: 'https://avatars.mds.yandex.net/get-pdb/1058492/5b6ad5d2-0e1e-449b-b37d-16d599307991/s1200?webp=false' },
        { id: 6, name: 'Valera', avatar: 'https://avatars.mds.yandex.net/get-pdb/1058492/5b6ad5d2-0e1e-449b-b37d-16d599307991/s1200?webp=false' },
      ],
    },
  },

  getState() {
    return this._state;
  },

  _callSubscriber() {
    console.log('State was changed');
  },

  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage =  profileReducer(this._state.profilePage, action);
    this._state.dialogsPage =  dialogsReducer(this._state.dialogsPage, action);
    this._state.myFriends =  friendsReducer(this._state.myFriends, action);
    this._callSubscriber(this._state);

  },
};



export default store;
window.store = store;