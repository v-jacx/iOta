import {SET_AUTH_TOKENS} from '../types'

const initialState = {
    authTokens: localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null
}

const AuthReducer = (state = initialState, action)=>{
    switch (action.type){
        case SET_AUTH_TOKENS:
            return {...state, authTokens: action.payload}
        default:
            return {...state}
    }
}

export default AuthReducer