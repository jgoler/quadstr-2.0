/*
import {
  CREATE_SUCCESS,
  CREATE_FAIL,
  JOIN_SUCCESS,
  JOIN_FAIL
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  //isAuthenticated: null,
  isCompleted: null,
  loading: true,
  user: null
}

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_SUCCESS:
      //localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        //isAuthenticated: true,
        isCompleted: true,
        loading: false
      }
    case JOIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isCompleted: true,
        loading: false
      }
    default:
      return state;
  }
}


*/
import {
  JOIN_SUCCESS,
  JOIN_FAIL
} from '../actions/types';

const initialState = {

  token: localStorage.getItem('token'),
  //isAuthenticated: null,
  isCompleted: null,
  loading: true,
  user: null,
  error: {}
}

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case JOIN_SUCCESS:
      return {
        ...state,
        ...payload,
        isCompleted: true,
        loading: false
      };
    case JOIN_FAIL:
      return {
        ...state,
        error: payload,
        loading: false
      };
    default:
      return state;
  }
}