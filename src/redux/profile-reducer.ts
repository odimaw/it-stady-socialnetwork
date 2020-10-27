import { PhotosType, PostType, ProfileType } from './../types/types'
import { stopSubmit } from 'redux-form'
import { usersAPI, profileAPI } from '../api/api'

const ADD_POST = 'profile/ADD-POST'
const SET_USER_PROFILE = 'profile/SET_USER_PROFILE'
const SET_STATUS = 'profile/SET_STATUS'
const DELETE_POST = 'profile/DELETE_POST'
const SAVE_PHOTO_SUCCESS = 'profile/SAVE_PHOTO_SUCCESS'

let initialState = {
  posts: [
    { id: 1, message: 'Hi, how are you?', likesCount: 12 },
    { id: 2, message: "It's my first post", likesCount: 24 },
    { id: 3, message: 'Yo', likesCount: 4 },
    { id: 4, message: 'Yo', likesCount: 24 },
    { id: 5, message: 'Yo', likesCount: 24 },
    { id: 6, message: 'Yo', likesCount: 24 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: '',
  newPostText: '',
}
export type InitialStateType = typeof initialState
const profileReducer = (
  state = initialState,
  action: any
): InitialStateType => {
  switch (action.type) {
    case ADD_POST:
      let body = action.newPostText
      return {
        ...state,
        newPostText: '',
        posts: [
          ...state.posts,
          {
            id: 5,
            message: body,
            likesCount: 0,
          },
        ],
      }
    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      }
    case SET_USER_PROFILE:
      return { ...state, profile: action.profile }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((p) => p.id != action.postId),
      }
    case SAVE_PHOTO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      }
    default:
      return state
  }
}

type addPostActionCreatorActionType = {
  type: typeof ADD_POST
  newPostText: string
}
export const addPostActionCreator = (
  newPostText: string
): addPostActionCreatorActionType => ({
  type: ADD_POST,
  newPostText,
})

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE
  profile: ProfileType
}
export const setUserProfile = (
  profile: ProfileType
): SetUserProfileActionType => ({
  type: SET_USER_PROFILE,
  profile,
})

type SetStatusActionType = {
  type: typeof SET_STATUS
  status: string
}
export const setStatus = (status: string): SetStatusActionType => ({
  type: SET_STATUS,
  status,
})
type DeletePostActionType = {
  type: typeof DELETE_POST
  postId: number
}
export const deletePost = (postId: number): DeletePostActionType => ({
  type: DELETE_POST,
  postId,
})

type SavePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS
  photos: PhotosType
}
export const savePhotoSuccess = (
  photos: PhotosType
): SavePhotoSuccessActionType => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
})

export const getUserProfile = (userId: number) => async (dispatch: any) => {
  let data = await usersAPI.getProfile(userId)
  dispatch(setUserProfile(data))
}

export const getStatus = (userId: number) => async (dispatch: any) => {
  let data = await profileAPI.getStatus(userId)
  dispatch(setStatus(data))
}

export const updateStatus = (status: string) => async (dispatch: any) => {
  try {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
      dispatch(setStatus(status))
    }
  } catch (error) {
    //
  }
}

export const savePhoto = (file: any) => async (dispatch: any) => {
  let data = await profileAPI.savePhoto(file)
  if (data.resultCode === 0) {
    dispatch(savePhotoSuccess(data.data.photos))
  }
}

export const saveProfile = (profile: ProfileType) => async (
  dispatch: any,
  getState: any
) => {
  const userId = getState().auth.id
  let data = await profileAPI.saveProfile(profile)
  if (data.resultCode === 0) {
    dispatch(getUserProfile(userId))
  } else {
    // lДобавить определение в какой именно форме была ошибка.
    dispatch(stopSubmit('edit-profile', { _error: data.messages[0] }))
    return Promise.reject(data.messages[0])
  }
}

export default profileReducer
