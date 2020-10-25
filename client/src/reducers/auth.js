import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CREATE_SUCCESS,
  CREATE_FAIL,
  CONFIRM_SUCCESS,
  CONFIRM_FAIL,
  CONFIRM_STARTED

} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
  isCompleted: null,
  emailConfirmed: false,
  emailConfirming: false
}

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    case CREATE_SUCCESS:
      return {
        ...state,
        ...payload,
        isCompleted: true,
        loading: false
      };
    case CONFIRM_SUCCESS:
      return {
        ...state,
        emailConfirmed: true,
        emailConfirming: false
      };
    case CONFIRM_FAIL:
      return {
        ...state,
        emailConfirmed: false,
        emailConfirming: false
      };
    case CONFIRM_STARTED:
      return {
        ...state,
        emailConfirmed: false,
        emailConfirming: true
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
    case CREATE_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        isCompleted: null
      };
    default:
      return state;
  }
}