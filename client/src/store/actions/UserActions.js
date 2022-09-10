import {SET_USER, SET_FEED} from '../types'

export const SetUser = (user)=> ({
    type: SET_USER,
    payload: user
})

export const SetFeed = (following)=> ({
    type: SET_FEED,
    payload: following
})
