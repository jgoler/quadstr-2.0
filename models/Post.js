const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  chat: {
    type: Schema.Types.ObjectId,
    ref: 'chat'
  },
  text: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  comments: [
    {
      text: {
        type: String,
        required: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model('post', PostSchema);