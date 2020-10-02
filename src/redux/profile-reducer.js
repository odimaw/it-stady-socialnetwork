import { usersAPI, profileAPI } from "../api/api";


const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: "It's my first post", likesCount: 24 },
        { id: 3, message: 'Yo', likesCount: 4 },
        { id: 4, message: 'Yo', likesCount: 24 },
        { id: 5, message: 'Yo', likesCount: 24 },
        { id: 6, message: 'Yo', likesCount: 24 },
    ],
    profile: null,
    status: '',
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            let body = action.newPostText;
            return {
                ...state,
                newPostText: '',
                posts: [...state.posts, {
                    id: 5,
                    message: body,
                    likesCount: 0,
                }],
            }
        case SET_STATUS:
            return {
                ...state,
                status: action.status,
            }
        case SET_USER_PROFILE:
            return { ...state, profile: action.profile }
        case DELETE_POST:
            return { ...state, posts: state.posts.filter(p => p.id != action.postId) }
        default:
            return state;
    }
}
export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const deletePost = (postId) => ({ type: DELETE_POST, postId })

export const getUserProfile = (userId) => {
    return (dispatch) => {
        // if (!userId) {
        //     userId =  9445;
        // }
        usersAPI.getProfile(userId)
            .then(data => {
                dispatch(setUserProfile(data));
            });
    }
}
export const getStatus = (userId) => {
    return (dispatch) => {
        // if (!userId) {
        //     userId =  9445;
        // }
        profileAPI.getStatus(userId)
            .then(data => {
                dispatch(setStatus(data));
            });
    }
}
export const updateStatus = (status) => {
    return (dispatch) => {
        profileAPI.updateStatus(status)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(setStatus(status));
                }
            });
    }
}
export default profileReducer;
