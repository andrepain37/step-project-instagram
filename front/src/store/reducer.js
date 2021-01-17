import { combineReducers } from 'redux'
import posts from './posts/reducer'
import user from './user/reducer'
import modals from './modals/reducer'
import subs from './subs/reducer'

export default combineReducers({
    posts,
    user,
    modals,
    subs
})