import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/chat';

const CommentForm = ({ addComment, match, history }) => {
  const [formData, setFormData] = useState({
    text: ''
  });

  const [clicked, setClicked] = useState(false);

  const {
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
    addComment(match.params.chatId, match.params.postId, { text }, history);
    console.log(formData);
    setFormData({
      [text]: ''
    })

  }
  return (
    <div>
      <div className="post-form">
        <div className="post-form-header bg-primary">
          <h3>Create a Comment</h3>
        </div>
        <form className="form my-1" onSubmit={e => onSubmit(e)}
        >
          <textarea
            cols="30"
            rows="5" placeholder="Create a comment"
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

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
}

export default connect(null, { addComment })(CommentForm);