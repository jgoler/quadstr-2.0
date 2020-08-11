import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getChatById } from '../../actions/profile';

const AboutChat = ({
  getChatById,
  profile: { chat },
  //chats: { chat, loading },
  match }) => {
  useEffect(() => {
    getChatById(match.params.id)
  }, [getChatById, match.params.id])

  return chat ? <Fragment>
    <h1 className="large text-primary">About {chat.title}</h1>
    <h3>Chat Code: {chat.code}</h3>

    <p className="lead">Users</p>
    <div className="profiles">
      <div className="profile bg-light">
        <ul>
          {chat.users.length > 0 ? chat.users.map(member => (
            <li key={member._id}>
              <p>{member.name}</p>
            </li>
          )) : <p>There are no members in this chat</p>}
        </ul>
      </div>
    </div>
  </Fragment> : <Fragment>Loading...</Fragment>

  /*
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
            <h2><Link to="#!">{post.title}</Link></h2>
          </div>
          <div>
            {post.text}
          </div>
        </div>
      )) : <h4>No posts</h4>}
    </div>

  </Fragment> : <p>Loading...</p>
*/
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
AboutChat.propTypes = {
  getChatById: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired,

}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getChatById })(AboutChat);