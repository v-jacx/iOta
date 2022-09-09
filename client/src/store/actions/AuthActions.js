import {SET_AUTH_TOKENS} from '../types'

export const SetAuthTokens = (authTokens)=> ({
    type: SET_AUTH_TOKENS,
    payload: authTokens
})
