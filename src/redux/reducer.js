import { combineReducers } from 'redux'
import { user } from '@redux/user.redux'
import { chat } from '@redux/chat.redux'

const reducer = combineReducers({ user, chat })

export default reducer