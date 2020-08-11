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

import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getChatById } from '../../actions/profile';
import { Link } from 'react-router-dom';

const Post = ({
  getChatById,
  profile: { chat },
  match }) => {
  useEffect(() => {
    getChatById(match.params.chatId)
  }, [getChatById, match.params.chatId])


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
    <div className="profile bg-light">
      <div>
        <h2>{post.title}</h2>
      </div>
      <div>
        {post.text}
      </div>
    </div>
    <Link to={`/comment-form/${chat._id}/${post._id}`}>Create Comment</Link>
    <br />
    <h2>Comments:</h2>
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

export default connect(mapStateToProps, { getChatById })(Post);