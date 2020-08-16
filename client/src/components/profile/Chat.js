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

  const [isClicked, setClicked] = useState({
    clicked: false
  });

  const { clicked } = isClicked;

  const changed = e => setClicked({ clicked: true });

  let allQuadMembers = "";
  let partialQuadMembers = "";

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  console.log(clicked);
  console.log(`Not clicked is equal to ${!clicked} `);

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
        } else {
          partialQuadMembers += ""
        }
      })
    }
    <h1 className="large text-primary">{`${chat.title} quad`}</h1>
    <p className="lead">Welcome to {chat.title}</p>
    {chat.users.length > 3 && !clicked ?
      <p><span style={{ color: "#17a2b8" }}>Members:</span> {partialQuadMembers} <span onClick={changed} style={{ color: "#17a2b8" }}>and {chat.users.length - 3} others</span></p> : <p><span style={{ color: "#17a2b8" }}>Members:</span> {allQuadMembers}</p>}

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
