import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Profile from './components/profile/Profile';
import PrivateRoute from './components/routing/PrivateRoute';
import CreateChat from './components/chat-form/CreateChat';
import JoinChat from './components/chat-form/JoinChat';
import Chat from './components/profile/Chat';
import PostForm from './components/profile/PostForm';
import AboutChat from './components/profile/AboutChat';
import Post from './components/profile/Post';
import CommentForm from './components/profile/CommentForm';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path='/profile' component={Profile} />
              <PrivateRoute exact path='/create-chat' component={CreateChat} />
              <PrivateRoute exact path='/join-chat' component={JoinChat} />
              <PrivateRoute exact path='/chat/:id' component={Chat} />
              <PrivateRoute exact path='/post-form/:id' component={PostForm} />
              <PrivateRoute exact path='/comment-form/:chatId/:postId' component={CommentForm} />
              <PrivateRoute exact path='/chat-details/:id' component={AboutChat} />
              <PrivateRoute exact path='/post/:chatId/:postId' component={Post} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
};

export default App;
