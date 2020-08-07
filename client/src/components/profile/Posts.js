import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


const Posts = ({ post }) => {
  const posts = post.map(p => (
    <li className="profile bg-light" key={p._id}>
      <div>
        <h2>{p.title}</h2>
      </div>
      <div>
        {p.text}
      </div>
    </li>
  ));
  return (
    <Fragment>
      <Link to="#!">Create New Post</Link>
      <div className="profile bg-light">
        <div>
          <h2>Posts:</h2>
        </div>
        <ul>
          {posts}
        </ul>
      </div>
    </Fragment>
  )
}

Posts.propTypes = {
  post: PropTypes.array.isRequired
}

export default Posts;
