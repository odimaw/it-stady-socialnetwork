import { AppStateType, InferActionsTypes } from './redux-store'
import { UserType } from './../types/types'
import { usersAPI } from '../api/api'
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

type InitialStateType = typeof initialState
const usersReducer = (
  state = initialState,
  action: ActionsTypes
): InitialStateType => {
  switch (action.type) {
    case 'FOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {
          followed: true,
        }),
      }
    case 'UNFOLLOW':
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, 'id', {
          followed: false,
        }),
      }
    case 'SET_USERS': {
      return { ...state, users: action.users }
    }
    case 'SET_CURRENT_PAGE': {
      return { ...state, currentPage: action.currentPage }
    }
    case 'SET_TOTAL_USERS_COUNT': {
      return { ...state, totalUsersCount: action.totalUsersCount }
    }
    case 'TOGGLE_IS_FETCHING': {
      return { ...state, isFetching: action.isFetching }
    }
    case 'TOGGLE_IS_FOLLOWING_PROGRESS': {
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

type ActionsTypes = InferActionsTypes<typeof actions>
export const actions = {
  followSuccess: (userId: number) =>
    ({
      type: 'FOLLOW',
      userId,
    } as const),
  unfollowSuccess: (userId: number) =>
    ({
      type: 'UNFOLLOW',
      userId,
    } as const),

  setUsers: (users: Array<UserType>) =>
    ({
      type: 'SET_USERS',
      users,
    } as const),

  setCurrentPage: (currentPage: number) =>
    ({
      type: 'SET_CURRENT_PAGE',
      currentPage,
    } as const),

  setTotalUsersCount: (totalUsersCount: number) =>
    ({
      type: 'SET_TOTAL_USERS_COUNT',
      totalUsersCount,
    } as const),

  toggleIsFetching: (isFetching: boolean) =>
    ({
      type: 'TOGGLE_IS_FETCHING',
      isFetching,
    } as const),

  toggleFollowingProgress: (isFetching: boolean, userId: number) =>
    ({
      type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
      isFetching,
      userId,
    } as const),
}

type DispatchType = Dispatch<ActionsTypes>
type GetStateType = () => AppStateType
type ThunkType2 = ThunkAction<
  Promise<void>,
  AppStateType,
  unknown,
  ActionsTypes
>

export const requestUsers = (Page: number, pageSize: number) => async (
  dispatch: DispatchType,
  getState: GetStateType
) => {
  dispatch(actions.toggleIsFetching(true))
  let data = await usersAPI.getUsers(Page, pageSize)
  dispatch(actions.toggleIsFetching(false))
  dispatch(actions.setUsers(data.items))
  dispatch(actions.setTotalUsersCount(data.totalCount))
  dispatch(actions.setCurrentPage(Page))
}

const _followUnfollowFlow = async (
  dispatch: DispatchType,
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

export const follow = (userId: number): ThunkType2 => async (dispatch) => {
  _followUnfollowFlow(
    dispatch,
    userId,
    usersAPI.follow.bind(userId),
    actions.followSuccess
  )
}

export const unfollow = (userId: number): ThunkType2 => async (dispatch) => {
  _followUnfollowFlow(
    dispatch,
    userId,
    usersAPI.unfollow.bind(userId),
    actions.unfollowSuccess
  )
}

export default usersReducer
