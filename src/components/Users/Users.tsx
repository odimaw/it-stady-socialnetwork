import React, { FC } from 'react'
import { UserType } from '../../types/types'
import Paginator from '../Paginator/Paginator'
import User from './User'

type PropsType = {
  currentPage: number
  onPageChanged: (pageNumber: number) => void
  totalUsersCount: number
  pageSize: number
  followingInProgress: Array<number>
  users: Array<UserType>
  unfollow: (userId: number) => void
  follow: (userId: number) => void
}

let Users: FC<PropsType> = ({
  currentPage,
  onPageChanged,
  totalUsersCount,
  pageSize,
  followingInProgress,
  ...props
}) => {
  return (
    <div>
      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalUsersCount={totalUsersCount}
        pageSize={pageSize}
      />
      <div>
        {props.users.map((u) => (
          <User
            user={u}
            key={u.id}
            followingInProgress={followingInProgress}
            unfollow={props.unfollow}
            follow={props.follow}
          />
        ))}
      </div>
    </div>
  )
}

export default Users
