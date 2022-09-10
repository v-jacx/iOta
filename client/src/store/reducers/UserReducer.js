import {SET_USER, SET_FEED} from '../types'
import jwt_decode from "jwt-decode"
const initialState = {
    user: localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null,
    feed: null
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
        default:
            return {...state}
    }
}

export default UserReducer