/*
import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPostById } from '../../actions/profile';

const Post = ({
  getPostById,
  profile: { post },
  match }) => {
  useEffect(() => {
    getPostById(match.params.chatId, match.params.postId)
  }, [])


  return <Fragment>
    <h1>Post</h1>
  </Fragment>

}

//chat.posts ? <Fragment>
//<h1>{post.title}</h1>
//</Fragment> : <h1>Post doesn't exist</h1>

Post.propTypes = {
  getPostById: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getPostById })(Post);
*/

import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getChatById } from '../../actions/profile';
import { addComment } from '../../actions/chat';

const Post = ({
  getChatById,
  addComment,
  profile: { chat },
  match }) => {
  useEffect(() => {
    getChatById(match.params.chatId)
  }, [getChatById, match.params.chatId]);

  const [formData, setFormData] = useState({
    text: ''
  });

  const { text } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });


  /*
  const post = chat.posts.find(post => {
    post.id.toString() === match.params.postId
  })
  */
  //console.log(chat.title);
  /*
  let post;
  return chat ? <Fragment>
    {post = chat.posts.find(post => post._id.toString() === match.params.postId)}
    <h1>{post.title}</h1>
    <h1>Test</h1>
  </Fragment> : <p>Loading...</p>
  */
  if (!chat) return <p>Loading...</p>;

  const post = chat.posts.find(post =>
    post._id.toString() === match.params.postId);

  return <Fragment>
    <h2>Discussion:</h2>
    <div className="profile bg-light">
      <div>
        <h2>{post.title}</h2>
      </div>
      <div>
        {post.text}
      </div>
    </div>
    <br />
    <h2>Comments:</h2>
    <div className="post-form-header bg-primary">
      <h3>Create a Comment</h3>
    </div>
    <form className="form my-1" onSubmit={e => {
      e.preventDefault();
      addComment(match.params.chatId, match.params.postId, { text });
    }}
    >
      <textarea
        cols="30"
        rows="5" placeholder="Create a comment"
        name='text'
        value={text}
        onChange={e => onChange(e)}
      />
      <input type="submit" value="Submit" className="btn btn-dark my-1" />
    </form>
    <br />
    {post.comments.length > 0 ? post.comments.map(comment => (
      <div className="profile bg-light" key={comment._id}>
        <div>
          <h4>
            {comment.text}
          </h4>
        </div>
      </div>
    )) : <h4>No comments</h4>}
  </Fragment>

}

Post.propTypes = {
  getChatById: PropTypes.func.isRequired,
  chat: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, { getChatById, addComment })(Post);