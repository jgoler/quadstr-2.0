import axios from 'axios';

import {
  GET_PROFILE,
  PROFILE_ERROR,
  GET_CHAT,
  GET_FAIL,
  GET_POST,
  RETRIEVE_FAIL
} from './types';





// Get current users profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR
    });
  }
};

// Get requested chat
export const getChatById = (chatId) => async dispatch => {
  try {
    const res = await axios.get(`/api/chats/${chatId}`);

    dispatch({
      type: GET_CHAT,
      payload: res.data
    });

  } catch (err) {
    dispatch({
      type: GET_FAIL,
      //payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get requested post
export const getPostById = (chatId, postId) => async dispatch => {
  try {
    const res = await axios.get(`/api/chats/posts/${chatId}/${postId}`);

    dispatch({
      type: GET_POST,
      payload: res.data
    });

  } catch (err) {
    console.error(err);
    dispatch({
      type: RETRIEVE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
};




/*
// Create or update profile
export const createChat = (formData, history, edit = false) => async dispatch => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/chat', formData, config);

    dispatch({
      type: GET_PROFILE,
      payload: res.data
    });

    history.pushState('/profile');
  } catch (err) {

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}
*/