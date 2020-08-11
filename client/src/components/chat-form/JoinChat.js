/*
import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { joinChat } from '../../actions/chat';
import { setAlert } from '../../actions/alert';

const JoinChat = ({ joinChat, history }) => {
  const [formData, setFormData] = useState({
    code: '',
    password: ''
  });

  const {
    code,
    password
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    joinChat(formData, history);
    //setAlert('Chat joined', 'success');
  }

  /*
  if (isCompleted) {
    return <Redirect to='/profile' />
  }
  */
/*
  return (
    <Fragment>
      <h1 className="large text-primary">
        Join a Chat
      </h1>
      <p className="lead">
        Fill Out Form Below
      </p>
      <div className="form" onSubmit={e => onSubmit(e)}>
        <form action="dashboard.html" className="form"  >
          <div className="form-group">
            <input type="text" placeholder="Chat Code" name='code' value={code} required onChange={e => onChange(e)} />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Chat Password" name='password' value={password} required minLength="6" onChange={e => onChange(e)} />
          </div>
          <input type="submit" value="Join" className="btn btn-primary" />
        </form>
      </div>
    </Fragment>
  )
};

JoinChat.propTypes = {
  setAlert: PropTypes.func.isRequired,
  joinChat: PropTypes.func.isRequired,
  isCompleted: PropTypes.bool
}

const mapStateToProps = state => ({
  isCompleted: state.auth.isCompleted
});


export default connect(
  mapStateToProps,
  { setAlert, joinChat }
)(JoinChat);

*/
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { joinChat } from '../../actions/chat';


const JoinChat = ({ joinChat, history }) => {
  const [formData, setFormData] = useState({
    code: '',
    password: ''
  });

  const {
    code,
    password
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <Fragment>
      <h1 className="large text-primary">
        Join a Chat
      </h1>
      <p className="lead">
        Fill Out Form Below
      </p>
      <div className="form" onSubmit={e => {
        e.preventDefault();
        joinChat(formData, history);
      }}>
        <form action="dashboard.html" className="form"  >
          <div className="form-group">
            <input type="text" placeholder="Chat Code" name='code' value={code} required onChange={onChange} />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Chat Password" name='password' value={password} required minLength="6" onChange={onChange} />
          </div>
          <input type="submit" value="Join" className="btn btn-primary" />
        </form>
      </div>
    </Fragment>
  );
};

JoinChat.propTypes = {
  joinChat: PropTypes.func.isRequired
};

export default connect(null, { joinChat })(JoinChat);