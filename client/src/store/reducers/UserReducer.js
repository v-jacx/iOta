import {SET_USER, SET_FEED, SET_FOLLOWING_IDS, REMOVE_ID} from '../types'
import jwt_decode from "jwt-decode"
const initialState = {
    user: localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null,
    feed: null,
    followingIds: []
}

const UserReducer = (state = initialState, action)=>{
    switch (action.type){
        case SET_USER:
            return {...state, user: action.payload}
        case SET_FEED:
            let allPosts = []
            const following = action.payload
            following.map((follow)=>{
                allPosts.push(follow.post)
            })
            return {...state, feed: allPosts}
        case SET_FOLLOWING_IDS:
            return{...state, followingIds: action.payload}
        case REMOVE_ID:
            const newIds = state.followingIds.filter(id => id !== action.payload)
            return {...state, followingIds: newIds}
        default:
            return {...state}
    }
}

export default UserReducer