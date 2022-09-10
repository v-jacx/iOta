import {createStore, combineReducers} from 'redux'
import UserReducer from './reducers/UserReducer'
import AuthReducer from './reducers/AuthReducer'
import ProfileReducer from './reducers/ProfileReducers'


const store = createStore (combineReducers({userState: UserReducer ,authTokensState: AuthReducer, profileState: ProfileReducer}))

export default store