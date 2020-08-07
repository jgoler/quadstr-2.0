/*const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const Chat = require('../../models/Chat');

// @route  GET api/posts/
// @desc   Test route
// @access Public
router.post('/chat/:chat_id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty(),
      check('title', 'Title is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }


  }
);

module.exports = router;
*/

// @route   POST api/chats/posts/:id
// @desc    Create a post
// @access  Private
//router.post('/')


// @route  POST api/chats/post/:id
// @desc   Create a post
// @access Private
/*
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Str = require('@supercharge/strings')
const Chat = require('../../models/Chat');
const Post = require('../../models/Post');
const bcrypt = require('bcryptjs');
const config = require('config');
/*

// @route  POST api/posts/:id
// @desc   Create a post
// @access Private
router.post(
  '/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty(),
      check('title', 'Title is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const chat = await Chat.findById(req.params.id);

      if (!chat) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      let isMember = false;

      // In line below, why do I have to do the .length > 0?
      if (chat.users.filter(member => member.user.toString() === req.user.id).length > 0) {
        isMember = true;
      }

      if (!isMember) {
        return res.status(400).json('Invalid Crendentials');
      }


      const newPost = new Post({
        title: req.body.title,
        text: req.body.text,
        chat: req.params.id
      });


      await newPost.save();
      res.json(newPost);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
*/


// @route   POST api/comment/:id
// @desc    Add a comment to a post
// @access  Private
/*
router.post(
  '/comment/:id',
  [
    auth,
    [
      check('text', 'Text is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const post = await .findById(req.params.id);

      if (!post) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const newComment = {
        text: req.body.text
      };

      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  })


module.exports = router;
*/