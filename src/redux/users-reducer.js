const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';

let initialState = {
    users: [
        // { id: 1, photoUrl: 'https://24smi.org/public/media/celebrity/2015/09/21/1442831684-dmitrij-nagiev.jpg', followed: false, fullName: 'Dmitry', status: 'I am a boss', location: { city: 'Voronech', country: 'Russia' } },
        // { id: 2, photoUrl: 'https://24smi.org/public/media/celebrity/2015/09/21/1442831684-dmitrij-nagiev.jpg', followed: true, fullName: 'Sasha', status: 'I am a boss too', location: { city: 'Moscow', country: 'Russia' } },
        // { id: 3, photoUrl: 'https://24smi.org/public/media/celebrity/2015/09/21/1442831684-dmitrij-nagiev.jpg', followed: false, fullName: 'Andrew', status: 'I am a boss too', location: { city: 'Kiev', country: 'Ukraine' } },
        // { id: 4, photoUrl: 'https://24smi.org/public/media/celebrity/2015/09/21/1442831684-dmitrij-nagiev.jpg',  followed: false, fullName: 'Sveta', status: 'I am a boss too', location: { city: 'Minsk', country: 'Belarussia' } },

    ],
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                   if (u.id === action.userId) {
                       return {...u, followed: true}
                   }
                    return u;
                }),
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(u => {
                   if (u.id === action.userId) {
                       return {...u, followed: false}
                   }
                    return u;
                }),
            }
            case SET_USERS: {
                return { ...state, users: [...state.users, ...action.users]}
            }
        default:
            return state;
    }
}
export const followAC = (userId) => ({
    type: FOLLOW,
    userId
})
export const unfollowAC = (userId) => ({
    type: UNFOLLOW,
    userId,
})
export const setUsersAC = (users) => ({
    type: SET_USERS,
    users,
})
export default usersReducer;