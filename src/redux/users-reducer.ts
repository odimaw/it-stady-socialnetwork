import { usersAPI } from './../api/users-api'
import { AppStateType, BaseThunkType, InferActionsTypes } from './redux-store'
import { UserType } from './../types/types'
import { updateObjectInArray } from '../utils/validators/object-helpers'
import { Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>, //array of users ids
}

const usersReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'users/FOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {
          followed: true,
        }),
      }
    case 'users/UNFOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {
          followed: false,
        }),
      }
    case 'users/SET_USERS': {
      return { ...state, users: action.users }
    }
    case 'users/SET_CURRENT_PAGE': {
      return { ...state, currentPage: action.currentPage }
    }
    case 'users/SET_TOTAL_USERS_COUNT': {
      return { ...state, totalUsersCount: action.totalUsersCount }
    }
    case 'users/TOGGLE_IS_FETCHING': {
      return { ...state, isFetching: action.isFetching }
    }
    case 'users/TOGGLE_IS_FOLLOWING_PROGRESS': {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id != action.userId),
      }
    }
    default:
      return state
  }
}

export const actions = {
  followSuccess: (userId: number) =>
    ({
      type: 'users/FOLLOW',
      userId,
    } as const),
  unfollowSuccess: (userId: number) =>
    ({
      type: 'users/UNFOLLOW',
      userId,
    } as const),

  setUsers: (users: Array<UserType>) =>
    ({
      type: 'users/SET_USERS',
      users,
    } as const),

  setCurrentPage: (currentPage: number) =>
    ({
      type: 'users/SET_CURRENT_PAGE',
      currentPage,
    } as const),

  setTotalUsersCount: (totalUsersCount: number) =>
    ({
      type: 'users/SET_TOTAL_USERS_COUNT',
      totalUsersCount,
    } as const),

  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: 'users/TOGGLE_IS_FETCHING',
      isFetching,
    } as const),

  toggleFollowingProgress: (isFetching: boolean, userId: number) =>
    ({
      type: 'users/TOGGLE_IS_FOLLOWING_PROGRESS',
      isFetching,
      userId,
    } as const),
}

export const requestUsers = (
  Page: number,
  pageSize: number
): ThunkType => async (dispatch, getState) => {
  dispatch(actions.toggleIsFetching(true))
  let data = await usersAPI.getUsers(Page, pageSize)
  dispatch(actions.toggleIsFetching(false))
  dispatch(actions.setUsers(data.items))
  dispatch(actions.setTotalUsersCount(data.totalCount))
  dispatch(actions.setCurrentPage(Page))
}

const _followUnfollowFlow = async (
  dispatch: Dispatch<ActionsTypes>,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => ActionsTypes
) => {
  dispatch(actions.toggleFollowingProgress(true, userId))
  let response = await apiMethod(userId)
  if (response.data.resultCode == 0) {
    dispatch(actionCreator(userId))
  }
  dispatch(actions.toggleFollowingProgress(false, userId))
}

export const follow = (userId: number): ThunkType => async (dispatch) => {
  _followUnfollowFlow(
    dispatch,
    userId,
    usersAPI.follow.bind(userId),
    actions.followSuccess
  )
}

export const unfollow = (userId: number): ThunkType => async (dispatch) => {
  _followUnfollowFlow(
    dispatch,
    userId,
    usersAPI.unfollow.bind(userId),
    actions.unfollowSuccess
  )
}

export default usersReducer

type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionsTypes>
