import axios from 'axios'

// Actions
const CHAT_USER_LIST = 'CHAT_USER_LIST'
const initState = {
    userList: []
}

// reducer
export function chat(state = initState, action) {
    switch(action.type) {
        case CHAT_USER_LIST:
            return { ...state, userList: action.payload }
        default:
            return state
    }
}

// Action Creators
function userList (data) {
    return { type: CHAT_USER_LIST, payload: data }
}

export function getUserList (type) {
    return (dispatch) => {
        axios.get('/user/list?type=' + type).then(res => {
            if (res.data.code === 0) {
                dispatch(userList(res.data.data))  
            }
        })
    }
}

