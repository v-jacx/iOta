import {SET_USER} from '../types'
import jwt_decode from "jwt-decode"
const initialState = {
    user: localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null
}

const UserReducer = (state = initialState, action)=>{
    switch (action.type){
        case SET_USER:
            return {...state, user: action.payload}
        default:
            return {...state}
    }
}

export default UserReducer