import {SET_USER} from '../types'

export const SetUser = (user)=> ({
    type: SET_USER,
    payload: user
})