import {
  ADD_POST
} from '../actions/types';

const initialState = {

  posts: [],
  chat: null,
  loading: true,
  error: {}
}

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_POST:
      return {
        ...state,
        chat: { ...state.chat, posts: payload },
        loading: false
      }
    default:
      return state;
  }
}