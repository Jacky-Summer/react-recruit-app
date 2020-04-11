import axios from 'axios'
import { getRedirectPath } from '../util'

// Actions
const USER_AUTH_SUCCESS = 'USER_AUTH_SUCCESS'
const USER_ERR0R_MSG = 'USER_ERROR_MSG'
const USER_LOAD_DATA = 'USER_LOAD_DATA'
const USER_CLEAR_MSG = 'USER_CLEAR_MSG'
const initState = {
    redirectTo: '',
    isAuth: false,
	msg: '',
	user: '',
	type: ''
}

// reducer
export function user(state = initState, action) {
    switch(action.type) {
        case USER_AUTH_SUCCESS:
            return { ...state, msg: '', redirectTo: getRedirectPath(action.payload), ...action.payload }
        case USER_ERR0R_MSG:
            return { ...state, isAuth: false, msg: action.msg }
        case USER_LOAD_DATA:
            return { ...state, ...action.payload }
        case USER_CLEAR_MSG:
            return { ...state, msg: '' }
        default:
            return state
    }
}


// Action Creators

function authSuccess (obj) {
    const { pwd, ...data } = obj
	return { type: USER_AUTH_SUCCESS, payload: data }
}

function errorMsg (msg) {
    return { type: USER_ERR0R_MSG, msg }
}

function clearMsg () {
    return { type: USER_CLEAR_MSG }
}

export function loadData (userInfo) {
    return { type: USER_LOAD_DATA, payload: userInfo }
}

export function login ({ user, pwd }) {
    if (!user || !pwd ) {
        return errorMsg('用户名或密码不能为空')
    }
    return (dispatch) => {
        axios.post('/user/login', { user, pwd }).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

export function register ({ user, pwd, repeatpwd, type }) {
    if (!user || !pwd || !type) {
        return errorMsg('用户名或密码不能为空')
    }
    if (pwd !== repeatpwd) {
        return errorMsg('密码与确认密码不一致')
    }
    return (dispatch) => {
        axios.post('/user/register', { user, pwd, type }).then(res => {
            if (res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess({ user, pwd, type }))
            } else {
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

export function clearPropsMsg () {
    return (dispatch) => {
        dispatch(clearMsg())
    }
}