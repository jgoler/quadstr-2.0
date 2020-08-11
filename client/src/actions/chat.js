import axios from 'axios';
import { setAlert } from './alert';
import {
  CREATE_SUCCESS,
  CREATE_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  JOIN_SUCCESS,
  JOIN_FAIL,
  ADD_POST,
  ADD_COMMENT
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
}

/* 
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
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
*/

// Add comment
export const addComment = (chatId, postId, formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const res = await axios.put(`/api/chats/post/comment/${chatId}/${postId}`, formData, config);
    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert('Comment Created', 'success'));

    history.push(`/post/${chatId}/${postId}`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
}
// Add post
export const addPost = (chatId, formData, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  //const body = JSON.stringify({ title, text });

  try {
    const res = await axios.post(`/api/chats/${chatId}`, formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data
    });

    dispatch(setAlert('Post Created', 'success'));

    //history.push('/profile');
    history.push(`/chat/${chatId}`);
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    /*
    dispatch({
      type: POST_FAIL
    });
    */
  }
}
// Create Chat
export const createChat = ({ title, password, password2 }, history) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ title, password, password2 });

  try {
    const res = await axios.post('/api/chats', body, config);

    dispatch({
      type: CREATE_SUCCESS,
      payload: res.data
    });

    history.push('/profile');



    // dispatch(loadUser());
    //dispatch(getCurrentProfile());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: CREATE_FAIL
    });
  }
}
/*
// Join Chat
// Login User
export const joinChat = ({code, password}) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ code, password });

  try {
    const res = await axios.put('/api/chats', body, config);

    dispatch({
      type: JOIN_SUCCESS,
      payload: res.data
    });

    //dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: JOIN_FAIL
    });
  }
};
*/

/*
// Join Chat
export const joinChat = (formData, history) => async dispatch => {
  try {
    const res = await axios.put('/api/chats', formData);

    dispatch({
      type: JOIN_SUCCESS,
      payload: res.data
    });

    history.push('/profile');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: CREATE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
*/
/*
// Join Chat
export const joinChat = ( formData, history ) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  const body = JSON.stringify({ code, password });

  try {
    const res = await axios.put('/api/chats', body, config);

    dispatch({
      type: JOIN_SUCCESS,
      payload: res.data
    });

    history.push('/profile');

    // dispatch(loadUser());
    //dispatch(getCurrentProfile());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: JOIN_FAIL
    });
  }
}
*/

// Join Chat
export const joinChat = (formData, history) => async dispatch => {
  try {
    const res = await axios.put('/api/chats', formData);

    dispatch({
      type: JOIN_SUCCESS,
      payload: res.data
    });

    dispatch(setAlert('Chat Joined', 'success'));

    history.push('/profile');
  } catch (err) {
    //const errors = err.response.data.errors;
    /*
        if (errors) {
          errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }
        
        */
    dispatch(setAlert('Invalid Credentials'), 'danger');

    dispatch({
      type: JOIN_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};