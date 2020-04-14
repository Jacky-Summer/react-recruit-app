import { combineReducers } from 'redux'
import { user } from '@redux/user.redux'
import { chat } from '@redux/chat.redux'
import { chatuser } from '@redux/chatuser.redux'

const reducer = combineReducers({ user, chat, chatuser })

export default reducer