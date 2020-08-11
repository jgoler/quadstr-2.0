import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createChat } from '../../actions/chat';
import { setAlert } from '../../actions/alert';

const CreateChat = ({ setAlert, createChat, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    password: '',
    password2: ''
  });

  const {
    title,
    password,
    password2
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      //isCompleted = true;
      createChat({ title, password }, history);
    }
  }


  return (
    <Fragment>
      <h1 className="large text-primary">
        Create New Chat
    </h1>
      <p className="lead">
        Fill Out Form Below
    </p>
      <div className="form" onSubmit={e => onSubmit(e)}>
        <form action="dashboard.html" className="form">
          <div className="form-group">
            <input type="text" placeholder="Chat Name" name='title' value={title} onChange={e => onChange(e)} />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Chat Password" name='password' value={password} onChange={e => onChange(e)}
              minLength="6"
            />
          </div>
          <div className="form-group">
            <input type="password"
              name='password2'
              value={password2}
              onChange={e => onChange(e)}
              placeholder="Confirm Password"
              required minLength="6"
            />
          </div>
          <input type="submit" value="Create" className="btn btn-primary" />
        </form>
      </div>
    </Fragment>
  )
};

CreateChat.propTypes = {
  setAlert: PropTypes.func.isRequired,
  createChat: PropTypes.func.isRequired,
  isCompleted: PropTypes.bool
}

const mapStateToProps = state => ({
  isCompleted: state.auth.isCompleted
});



export default connect(
  mapStateToProps,
  { setAlert, createChat }
)(CreateChat);