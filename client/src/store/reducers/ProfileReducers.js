import { useNavigate } from 'react-router-dom'
import {SET_PROFILE} from '../types'

const initialState = {
    profile: null,
}

const ProfileReducer = (state = initialState, action)=>{
    switch (action.type){
        case SET_PROFILE:
            return {...state, profile: action.payload}
        default:
            return {...state}
    }
}

export default ProfileReducer