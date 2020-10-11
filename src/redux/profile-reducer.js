import { stopSubmit } from "redux-form";
import { usersAPI, profileAPI } from "../api/api";


const ADD_POST = 'profile/ADD-POST';
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const DELETE_POST = 'profile/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS';

let initialState = {
    posts: [
        { id: 1, message: 'Hi, how are you?', likesCount: 12 },
        { id: 2, message: "It's my first post", likesCount: 24 },
        { id: 3, message: 'Yo', likesCount: 4 },
        { id: 4, message: 'Yo', likesCount: 24 },
        { id: 5, message: 'Yo', likesCount: 24 },
        { id: 6, message: 'Yo', likesCount: 24 },
    ],
    profile: '',
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
        case SAVE_PHOTO_SUCCESS:
            return { ...state, profile: { ...state.profile, photos: action.photos } }
        default:
            return state;
    }
}
export const addPostActionCreator = (newPostText) => ({ type: ADD_POST, newPostText })
export const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile })
export const setStatus = (status) => ({ type: SET_STATUS, status })
export const deletePost = (postId) => ({ type: DELETE_POST, postId })
export const savePhotoSuccess = (photos) => ({ type: SAVE_PHOTO_SUCCESS, photos })

export const getUserProfile = (userId) => async (dispatch) => {
    let data = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(data));
}

export const getStatus = (userId) => async (dispatch) => {
    let data = await profileAPI.getStatus(userId);
    dispatch(setStatus(data));
}

export const updateStatus = (status) => async (dispatch) => {
    try {
        let data = await profileAPI.updateStatus(status);
        if (data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    } catch (error) {
        //
    }
}

export const savePhoto = (file) => async (dispatch) => {
    let data = await profileAPI.savePhoto(file);
    if (data.resultCode === 0) {
        dispatch(savePhotoSuccess(data.data.photos));
    }
}

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.id;
    let data = await profileAPI.saveProfile(profile);
    if (data.resultCode === 0) {
        dispatch(getUserProfile(userId));

    } else {
        // lДобавить определение в какой именно форме была ошибка.
        dispatch(stopSubmit('edit-profile', { _error: data.messages[0] }));
        return Promise.reject(data.messages[0]);
    }
}

export default profileReducer;
