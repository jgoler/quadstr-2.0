import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createChat } from '../../actions/chat';
import { setAlert } from '../../actions/alert';

const CreateChat = ({ setAlert, createChat, history }) => {
  const [formData, setFormData] = useState({
    title: ''
  });

  const {
    title
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createChat({ title }, history);
  }

  return (
    <Fragment>
      <Link to={`/profile`}>
        <i className="fas fa-arrow-left"></i> Return to Your Chats
      </Link>
      <h1 className="large text-primary">
        Create New Quad
        </h1>
      <p className="lead">
        Fill Out Form Below
        </p>
      <div className="form" onSubmit={e => onSubmit(e)}>
        <form action="dashboard.html" className="form">
          <div className="form-group">
            <input type="text" placeholder="Quad Name" name='title' value={title} onChange={e => onChange(e)} />
          </div>
          <input type="submit" value="Create" className="btn btn-primary" />
        </form>
      </div>
    </Fragment>
  );
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