import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getChatById } from '../../actions/profile';
import { addPost } from '../../actions/chat';

const Chat = ({
  getChatById,
  addPost,
  profile: { chat },
  //chats: { chat, loading },
  match }) => {
  useEffect(() => {
    getChatById(match.params.id)
  }, [getChatById, match.params.id]);

  const [formData, setFormData] = useState({
    title: '',
    text: ''
  });



  const {
    title,
    text
  } = formData;

  let allQuadMembers = "";
  let partialQuadMembers = "";

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });


  return chat ? <Fragment>
    {
      chat.users.map((user, index) => {
        if (chat.users.length === index + 1) {
          allQuadMembers += ` ${user.name}`
        } else {
          allQuadMembers += ` ${user.name},`
        }

      })
    }
    {
      chat.users.map((user, index) => {
        if (chat.users.length === index + 1 && index < 3) {
          partialQuadMembers += ` ${user.name}`
        } else if (index < 3) {
          partialQuadMembers += ` ${user.name},`
        } else if (index === 3) {
          partialQuadMembers += ` and ${chat.users.length - 3} more`
        } else {
          partialQuadMembers += ""
        }
      })
    }
    <h1 className="large text-primary">{`${chat.title} quad`}</h1>
    <p className="lead">Welcome to {chat.title}</p>
    <p><span style={{ color: "#17a2b8" }}>Members:</span> {allQuadMembers} </p>
    <br />
    <div className="post-form">
      <div className="post-form-header bg-primary">
        <h3>Start a Discussion</h3>
      </div>
      <form className="form my-1" onSubmit={e => {
        e.preventDefault();
        addPost(match.params.id, { title, text });
      }}
      >
        <textarea
          name='title'
          cols="30"
          rows="2"
          placeholder="Create discussion title"
          value={title}
          onChange={e => onChange(e)}
        />
        <textarea
          cols="30"
          rows="5" placeholder="Discussion text"
          name='text'
          value={text}
          onChange={e => onChange(e)}
        />
        <input type="submit" value="Submit" className="btn btn-dark my-1" />
      </form>
    </div>
    <div className="posts">
      <p className="lead">
        Discussions
      </p>
      {chat.posts.length > 0 ? chat.posts.map(post => (
        <div className="profile bg-light" key={post._id}>
          <div>
            <h2><Link to={`/post/${chat._id}/${post._id}`}>{post.title}</Link></h2>
          </div>
          <div>
            {post.text}
          </div>
          <div>
            <span style={{ color: "#17a2b8" }}>
              {`${post.comments.length} comment(s)`}
            </span>
          </div>

        </div>
      )) : <h4>No posts</h4>}
    </div>

  </Fragment > : <p>Loading...</p>
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
  addPost: PropTypes.func.isRequired,
  chat: PropTypes.array

}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getChatById, addPost })(Chat);


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
