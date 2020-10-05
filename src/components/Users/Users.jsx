import React from 'react';
import Paginator from '../Paginator/Paginator';
import User from './User';


let Users = ({ currentPage, onPageChanged, totalUsersCount, pageSize, followingInProgress, ...props }) => {
    return <div>
        <Paginator currentPage={currentPage}
            onPageChanged={onPageChanged}
            totalUsersCount={totalUsersCount}
            pageSize={pageSize}
        />
        <div>
            {props.users.map(u => <User user={u}
                key={u.id}
                followingInProgress={followingInProgress}
                unfollow={props.unfollow}
                follow={props.follow}
            />)
            }</div>
    </div>
}




export default Users;