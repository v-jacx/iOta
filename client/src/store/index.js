import {createStore, combineReducers} from 'redux'
import UserReducer from './reducers/UserReducer'


const store = createStore (combineReducers({userState: UserReducer}))

export default store