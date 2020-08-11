import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getChatById } from '../../actions/profile';

const Chat = ({
  getChatById,
  profile: { chat },
  //chats: { chat, loading },
  match }) => {
  useEffect(() => {
    getChatById(match.params.id)
  }, [getChatById, match.params.id])

  return chat ? <Fragment>
    <h1 className="large text-primary">{chat.title}</h1>
    <p className="lead">Welcome to {chat.title}</p>
    <Link to={`/chat-details/${chat._id}`}>Chat Details</Link>
    <br />
    <Link to={`/post-form/${chat._id}`}>Create Post</Link>
    <p className="lead">
      Posts
    </p>
    <div className="posts">
      {chat.posts.length > 0 ? chat.posts.map(post => (
        <div className="profile bg-light" key={post._id}>
          <div>
            <h2><Link to={`/post/${chat._id}/${post._id}`}>{post.title}</Link></h2>
          </div>
          <div>
            {post.text}
          </div>
        </div>
      )) : <h4>No posts</h4>}
    </div>

  </Fragment> : <p>Loading...</p>
}

/*
const Chat = ({
  getChatById,
  profile: { chat },
  //chats: { chat, loading }, 
  match }) => {
  useEffect(() => {
    getChatById(match.params.id);
  }, [getChatById]);
  return (
    <Fragment>
      <h1>{chat}</h1>
    </Fragment>
  )
}

*/
Chat.propTypes = {
  getChatById: PropTypes.func.isRequired,
  chat: PropTypes.array

}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getChatById })(Chat);


/*
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

const Chat = props => {
  const chatId = useParams();
  return <Fragment>
    {chatId}
  </Fragment>
};

Chat.propTypes = {};

export default Chat;


/*
import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentChat } from '../../actions/profile';
import Posts from './Posts';

const Chat = ({ chat }) => {
  return loading && chat === null ? <div>Loading...</div> : <Fragment>
  <h1 className="large text-primary">
    {chat.title}
  </h1>
  <Link to="#!">Chat details</Link>
  {chat !== null ? (
    <Fragment>
      <Posts post={chat.posts} />
    </Fragment>) :
    (
      <Fragment>
        <Link to="/create-post">Create New Post</Link>
        <div className="profile bg-light">
          <div>
            <h2>
              Posts:
            </h2>
            <p>There are no posts</p>
          </div>
        </div>
      </Fragment>
    )}
};


Chat.propTypes = {
  getCurrentChat: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  chat: state.chat
});

export default connect(mapStateToProps, { getCurrentChat })(Chat);


  */

/*
import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Chat = ({ chat }) => {
const posts = chat.map(post => (
  <div key={post._id} class="profile bg-light">
    <div>
      <h2><Link to="post.html">{post.title}</Link></h2>
    </div>
    <div>
      {post.text}
    </div>
  </div>
));
return (
  <Fragment>
    <h1 className="large text-primary">
      {chat.title}
    </h1>
    <Link to="/chat-details">Chat Details</Link>
    <p className="lead">
      Posts
    </p>
    <Link to="create_post.html">Create new post</Link>
    <div class="posts">
      {posts}
    </div>
  </Fragment>
)
};

Chat.propTypes = {
chat: PropTypes.object.isRequired
};

export default Chat;
*/
