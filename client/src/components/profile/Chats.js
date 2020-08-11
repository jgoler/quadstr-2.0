import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Chats = ({ chat }) => {
  const chats = chat.map(ch => (
    <li key={ch._id} className="text-primary">
      <Link to={`/chat/${ch._id}`}>{ch.title}</Link>
    </li>
  ));
  return (
    <Fragment>
      <Link to="/create-chat">Create New Chat</Link>
      <br />
      <Link to="/join-chat">Join a Chat</Link>
      <div className="profiles">
        <div className="profile bg-light">
          <div>
            <h2>Your chats:</h2>
          </div>
          <ul>
            {chats}
          </ul>
        </div>
      </div>
    </Fragment>
  )
}

Chats.propTypes = {
  chat: PropTypes.array
}

export default Chats;

/*import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom'

*/



/*

const Chats = ({
  chat }) => {



  const history = useHistory();

  const chats = chat.map(ch => (
    <li className="text-primary" key={ch._id}>
      <Link to={`/chat/${ch._id}`}>{ch}</Link>
    </li>
  ));
  return <Fragment>
    <Link to="/create-chat">Create New Chat</Link>
    <br />
    <Link to="/join-chat">Join a Chat</Link>
    <div className="profiles">
      <div className="profile bg-light">
        <div>
          <h2>Your chats:</h2>
        </div>
        <ul>
          {chats}
        </ul>
      </div>
    </div>
  </Fragment>
};

Chats.propTypes = {
  chat: PropTypes.array.isRequired
}



export default Chats;


*/