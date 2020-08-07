const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  users: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
      },
      name: {
        type: String,
        ref: 'user'
      }
    }
  ],
  code: {
    type: String,
    required: true
  },
  posts: [
    {
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
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }

});

module.exports = Chat = mongoose.model('chat', ChatSchema);