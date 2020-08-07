import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  GET_CHAT,
  GET_FAIL,
  GET_POST,
  RETRIEVE_FAIL
} from '../actions/types';

const initialState = {
  profile: null,
  loading: true,
  error: {},
  chat: null
}

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };
    case GET_CHAT:
      return {
        ...state,
        chat: payload,
        loading: false
      }
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false
      }
    case PROFILE_ERROR:
    case GET_FAIL:
    case RETRIEVE_FAIL:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false
      }
    default:
      return state;
  }
}