/*const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Chat = require('../../models/Chat');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route POST api/chat
// @desc  Create or update a chat
// @access Private
router.post('/', [
  auth,
  [
    check('title', 'Please include a title for your chat').not().isEmpty(),
    check('code', 'Please enter a code for your chat with 6 or more characters').isLength({ min: 6 })
  ]
],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, code } = req.body;
    const profileFields = {};
    profileFields.creator = req.user.id;
    //profileFields.users = req.user.id;
    if (title) profileFields.title = title;
    if (code) profileFields.code = code;
    try {

      chat = new Chat(profileFields);

      const salt = await bcrypt.genSalt(10);
      chat.code = await bcrypt.hash(code, salt);
      //chat.users.unshift({ user: req.user.id });
      await chat.save();

      const payload = {
        chat: {
          id: chat.id
        }
      }

      jwt.sign(payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }

  });


// @route  PUT api/chats/chat
// @desc   Join a chat
// @access Private
router.put('/chat', auth, async (req, res) => {
  try {
    const chat = await Chat.findOne({ title: req.body.title });

    // Check if the chat has already been joined
    if (chat.users.filter(member => member.user.toString() === req.user.id).length > 0) {
      return res.json(400).json({ msg: 'Chat already joined' });
    }

    chat.users.unshift({ user: req.user.id });
    await chat.save();

    res.json(chat.users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});





module.exports = router;
*/
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

// @route  POST api/chats
// @desc   Create a chat
// @access Public
router.post('/', [auth, [
  check(
    'title',
    'Title is required')
    .not()
    .isEmpty(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 })
]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      //const user = await User.findById(req.user.id).select('-password');

      //const members = [req.user.id];

      const passcode = Str.random(7);
      console.log(passcode);
      console.log(req.user.name);
      console.log(req.user.id);

      const newChat = new Chat({
        title: req.body.title,
        creator: req.user.id,
        users: [
          {
            user: req.user.id,
            name: req.user.name
          }
        ],
        code: passcode,
        password: req.body.password
      });

      const salt = await bcrypt.genSalt(10);

      newChat.password = await bcrypt.hash(req.body.password, salt);

      const chat = await newChat.save();
      res.json(chat);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }

  });

// @route  Put api/chats
// @desc   Add a user to a chat
// @access Private
router.put('/', [auth,
  [
    check(
      'code',
      'Please include the code for the chat')
      .not()
      .isEmpty(),
    check(
      'password',
      'Please include the password for the chat'
    ).not()
      .isEmpty()
  ]
],
  async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const chat = await Chat.findOne({ code: req.body.code });
      //const user = await User.findOne({ user: req.user.id });

      if (!chat) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // Check if the chat has already been joined by the user
      if (chat.users.filter(member => member.user.toString() === req.user.id).length > 0) {
        return res.status(400).json({ msg: 'Chat already joined' });
      }

      //console.log(chat.password);

      const isMatch = await bcrypt.compare(req.body.password, chat.password);

      if (!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const newUser = {
        user: req.user.id,
        name: req.user.name
      }


      chat.users.unshift(newUser);

      await chat.save();

      res.json(chat.users);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


// @route  Post api/chats/:id
// @desc   Add a post to a chat
// @access Private
router.post('/:id',
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

      if (chat.users.filter(member => member.user.toString() === req.user.id).length > 0) {
        isMember = true;
      }

      if (!isMember) {
        return res.status(400).json('Invalid Credentials');
      }

      /*
      const postFields = {};
      postFields.title = req.body.title;
      postFields.text = req.body.text;
      */
      const newPost = {
        title: req.body.title,
        text: req.body.text
      }



      chat.posts.unshift(newPost);

      await chat.save();

      res.json(chat.posts);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);








// @route  POST api/chats/post/:id
// @desc   Create a post
// @access Private
/*router.post(
  '/post/:id',
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

      const newPost = new Post({
        title: req.body.title,
        text: req.body.text
      });

      chat.posts.unshift(newPost);
      await chat.save();
      res.json(chat.posts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
*/

// @route  GET api/chats/:id
// @desc   Get a chat
// @access Private
router.get('/:id', auth, async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }


    let isMember = false;

    if (chat.users.filter(member => member.user.toString() === req.user.id).length > 0) {
      isMember = true;
    }

    if (!isMember) {
      return res.status(400).json('Invalid Credentials');
    }
    res.json(chat);
  } catch (err) {
    console.error(err.message);
    console.log("Hello");
    res.status(500).send('Server Error');
  }
})

// @route  GET api/chats/posts/:id
// @desc   Get all posts in a chat
// @access Private
router.get('/posts/:id', auth, async (req, res) => {
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

    //console.log(isMember);
    if (!isMember) {
      return res.status(400).json('Invalid Crendentials');
    }

    if (!chat) {
      return res.status(400).json('Invalid id');
    }

    const chatID = req.params.id.toString();

    chat.posts = await Post.find({ chat: chatID });
    console.log(chat.posts);
    res.json(chat.posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});




// @route  GET api/chats/post/:idOne/:idTwo
// @desc   Get a single post from a chat
// @access Private
router.get('/posts/:idOne/:idTwo', auth, async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.idOne);
    if (!chat) {
      return res.status(400).json('Invalid chat id');
    }

    let isMember = false;

    // In line below, why do I have to do the .length > 0?
    if (chat.users.filter(member => member.user.toString() === req.user.id).length > 0) {
      isMember = true;
    }

    if (!isMember) {
      return res.status(400).json('Invalid Crendentials');
    }

    //chat.users.filter(member => member.user.toString() === req.user.id).length > 0)
    const post = chat.posts.filter(post => post.id.toString() === req.params.idTwo);
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

/*
// @route   POST api/comment/:id
// @desc    Add a comment to a post
// @access  Private
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
      const post = await Post.findById(req.params.id);

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

*/

// @route Put api/chats/post/comment/:chatId/:postId
// @desc  Add a comment on a post
// @access Private
router.put('/post/comment/:chatId/:postId', [auth,
  [
    check(
      'text',
      'Please include text for your comment')
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
      const chat = await Chat.findById(req.params.chatId);

      if (!chat) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      let isMember = false;

      if (chat.users.filter(member => member.user.toString() === req.user.id).length > 0) {
        isMember = true;
      }

      if (!isMember) {
        return res.status(400).json('Invalid Credentials');
      }

      const post = chat.posts.find(post => post._id.toString() === req.params.postId);

      const newComment = {
        text: req.body.text
      }

      post.comments.unshift(newComment);

      await chat.save();

      res.json(chat.posts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;