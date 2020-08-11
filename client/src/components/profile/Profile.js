import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Chats from './Chats';

const Profile = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading } }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? <div>Loading...</div> : <Fragment>
    <h1 className="large text-primary">
      Profile
    </h1>
    <p className="lead">Welcome {user && user.name}!</p>
    {profile !== null ? (
      <Fragment>
        <Chats chat={profile.chats} />
      </Fragment>) :
      (
        <Fragment>
          <Link to="/create-chat">Create New Chat</Link>
          <br />
          <Link to="/join-chat">Join a Chat</Link>
          <div className="profiles">
            <div className="profile bg-light">
              <div>
                <h2>Your chats:</h2>
              </div>
              <p>You have no chats</p>
            </div>
          </div>
        </Fragment>
      )}
  </Fragment>
};

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Profile);