import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/chat';

const PostForm = ({ addPost, match, history }) => {
  const [formData, setFormData] = useState({
    title: '',
    text: '',
  });

  const [clicked, setClicked] = useState(false);

  const {
    title,
    text
  } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    console.log(`Click:  ${clicked}`);
    if (clicked) {
      return;
    }
    else {
      setClicked(true)
    }
    addPost(match.params.id, { title, text }, history);
    console.log(formData);
    setFormData({
      [title]: '',
      [text]: ''
    })

  }
  return (
    <div>
      <div className="post-form">
        <div className="post-form-header bg-primary">
          <h3>Create a Post</h3>
        </div>
        <form className="form my-1" onSubmit={e => onSubmit(e)}
        >
          <textarea
            name='title'
            cols="30"
            rows="2"
            placeholder="Create post title"
            value={title}
            onChange={e => onChange(e)}
          />
          <textarea
            cols="30"
            rows="5" placeholder="Create a post"
            name='text'
            value={text}
            onChange={e => onChange(e)}
          />
          <input type="submit" value="Submit" class="btn btn-dark my-1" />
        </form>
      </div>
    </div>
  )
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
}

export default connect(null, { addPost })(PostForm);