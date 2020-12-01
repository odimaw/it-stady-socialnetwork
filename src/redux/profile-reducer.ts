import { usersAPI } from './../api/users-api'
import { profileAPI } from './../api/profile-api'
import { PhotosType, PostType, ProfileType } from './../types/types'
import { FormAction, stopSubmit } from 'redux-form'
import { BaseThunkType, InferActionsTypes } from './redux-store'

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

const profileReducer = (
  state = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case 'profile/ADD-POST':
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
    case 'profile/SET_STATUS':
      return {
        ...state,
        status: action.status,
      }
    case 'profile/SET_USER_PROFILE':
      return { ...state, profile: action.profile }
    case 'profile/DELETE_POST':
      return {
        ...state,
        posts: state.posts.filter((p) => p.id != action.postId),
      }
    case 'profile/SAVE_PHOTO_SUCCESS':
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType,
      }
    default:
      return state
  }
}

export const actions = {
  addPostActionCreator: (newPostText: string) =>
    ({
      type: 'profile/ADD-POST',
      newPostText,
    } as const),
  setUserProfile: (profile: ProfileType) =>
    ({
      type: 'profile/SET_USER_PROFILE',
      profile,
    } as const),
  setStatus: (status: string) =>
    ({
      type: 'profile/SET_STATUS',
      status,
    } as const),
  deletePost: (postId: number) =>
    ({
      type: 'profile/DELETE_POST',
      postId,
    } as const),
  savePhotoSuccess: (photos: PhotosType) =>
    ({
      type: 'profile/SAVE_PHOTO_SUCCESS',
      photos,
    } as const),
}

export const getUserProfile = (userId: number): ThunkType => async (
  dispatch
) => {
  let data = await profileAPI.getProfile(userId)
  dispatch(actions.setUserProfile(data))
}

export const getStatus = (userId: number): ThunkType => async (dispatch) => {
  let data = await profileAPI.getStatus(userId)
  dispatch(actions.setStatus(data))
}

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
  try {
    let data = await profileAPI.updateStatus(status)
    if (data.resultCode === 0) {
      dispatch(actions.setStatus(status))
    }
  } catch (error) {
    //
  }
}

export const savePhoto = (file: File): ThunkType => async (dispatch) => {
  let data = await profileAPI.savePhoto(file)
  if (data.resultCode === 0) {
    dispatch(actions.savePhotoSuccess(data.data.photos))
  }
}

export const saveProfile = (profile: ProfileType): ThunkType => async (
  dispatch,
  getState
) => {
  const userId = getState().auth.id
  let data = await profileAPI.saveProfile(profile)
  if (data.resultCode === 0) {
    if (userId != null) {
      dispatch(getUserProfile(userId))
    } else {
      throw new Error("userId can't be null")
    }
  } else {
    // lДобавить определение в какой именно форме была ошибка.
    dispatch(stopSubmit('edit-profile', { _error: data.messages[0] }))
    return Promise.reject(data.messages[0])
  }
}

export default profileReducer

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsType | FormAction>
