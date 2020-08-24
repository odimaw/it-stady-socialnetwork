import { usersAPI, profileAPI } from "../api/api";

const ADD_POST = 'ADD-POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: "It's my first post", likesCount: 24 },
        { id: 3, message: 'Yo', likesCount: 4 },
        { id: 4, message: 'Yo', likesCount: 24 },
        { id: 5, message: 'Yo', likesCount: 24 },
        { id: 6, message: 'Yo', likesCount: 24 },
    ],
    newPostText: 'it-kamasutra.com',
    profile: null,
    status: '',
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let body = state.newPostText;
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, {
                    id: 5,
                    message: body,
                    likesCount: 0,
                }],
            }
        case UPDATE_NEW_POST_TEXT:
            return {
                ...state,
                newPostText: action.newText,
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status,
            }
        case SET_USER_PROFILE:
            return { ...state, profile: action.profile }
        default:
            return state;
    }
}
export const addPostActionCreator = () => ({ type: ADD_POST })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const updateNewPostBodyCreator = (text) => ({
    type: UPDATE_NEW_POST_TEXT,
    newText: text,
})

export const getUserProfile = (userId) => {
    return (dispatch) => {
        if (!userId) {
            userId = 2;
        }
        usersAPI.getProfile(userId)
            .then(data => {
                dispatch(setUserProfile(data));
            });
    }
}
export const getStatus = (userId) => {
    return (dispatch) => {
        if (!userId) {
            userId = 2;
        }
        profileAPI.getStatus(userId)
            .then(data => {
                dispatch(setStatus(data));
            });
    }
}
export const updateStatus = (status) => {
    return (dispatch) => {
        // if (!userId) {
        //     userId = 2;
        // }
        profileAPI.updateStatus(status)
            .then(data => {
                if (data.resultCode === 0) {
                dispatch(setStatus(status));
                }
            });
    }
}
export default profileReducer;