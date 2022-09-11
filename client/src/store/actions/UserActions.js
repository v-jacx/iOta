import {SET_USER, SET_FEED, SET_FOLLOWING_IDS, REMOVE_ID, ADD_ID} from '../types'

export const SetUser = (user)=> ({
    type: SET_USER,
    payload: user
})

export const SetFeed = (following)=> ({
    type: SET_FEED,
    payload: following
})

export const SetFollowingIds =(ids)=>({
    type: SET_FOLLOWING_IDS,
    payload: ids
})

export const RemoveId = (id)=>({
    type: REMOVE_ID,
    payload: id
})
