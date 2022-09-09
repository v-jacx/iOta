import {createStore, combineReducers} from 'redux'
import UserReducer from './reducers/UserReducer'
import AuthReducer from './reducers/AuthReducer'


const store = createStore (combineReducers({userState: UserReducer ,authTokensState: AuthReducer}))

export default store