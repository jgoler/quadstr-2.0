const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

/*
// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
 
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }
 
    // '$elemMatch' allows you to search subdocuments
    const chats = await Chat.find({
      users: { $elemMatch: { user: req.user.id } }
    });
 
    // make sure chats exist
    // (need to check length since an array will always be returned)
    if (chats.length === 0) {
      return res.status(404).json({ msg: 'No chats' });
    }
 
    const profile = new Profile({
      user: req.user.id,
      chats: chats.map(chat => chat.title) // in the Profile model, the 'chats' field is an array of strings. I'm just guessing here that you want the chat titles as an array
    });
 
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
*/

/*
// This is just a test route
// @route  Get api/profile/me
// @desc   Get current users profile
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = req.user.id;
    console.log(user);
    const chats = Chat.find(chat => chat.users.includes(user));


    res.json(chats);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
*/
//const chats = Chat.find(chat => chat.users.find(user => user.id === req.user.id));


// @route  Get api/profile/me test endpoint
// @desc   Get current users profile
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    // '$elemMatch' allows you to search subdocuments
    const chats = await Chat.find({
      users: { $elemMatch: { user: req.user.id } }
    });

    // make sure chats exist
    // (need to check length since an array will always be returned)
    if (chats.length === 0) {
      return res.status(404).json({ msg: 'No chats' });
    }

    const profile = new Profile({
      user: req.user.id,
      chats: chats
      //.map(chat => chat.title) // in the Profile model, the 'chats' field is an array of strings. I'm just guessing here that you want the chat titles as an array
    });

    //await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

/*
THIS IS THE ENDPOINT TO USE PROBABLY
// @route  GET api/profile/me
// @desc   Get current users profile
// @access Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
*/


/*
// @route  Post api/profile
// @desc   Create or update user profile
// @access Private
router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    console.log(user);
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const userID = req.user.id.toString();
    //const profileID = req.params.id.toString();

    //profile.chats = await Chat.find({ chat.users.includes(user => user.id): chatID });

    // Here, I'm trying to find the list of chats the user is a part of
    const chats = Chat.find(chat => chat.users.find(user => user.id === req.user.id));

    console.log(chats);
    // Make sure chats exist
    if (!chats) {
      return res.status(404).json({ msg: 'No chats' });
    }

    const profile = new Profile({
      user: req.user.id,
      chats: [chats]
    });

    await profile.save();
    res.json(profile);


  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

});
*/


/*
// @route  Post api/profile
// @desc   Create or update user profile
// @access Private
router.post('/', auth, async (req, res) => {

  const { chats } = req.body;
  const profileFields = {};
  profileFields.user = req.user.id;
  if (chats) {
    profileFields.chats = chats.split(',').map(chat => chat.trim());
  }

  console.log(profileFields.chats);
  try {
    let profile = await Profile.findOne({ user: req.user.id });

    if (profile) {
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      );
      return res.json(profile);
    }

    profile = new Profile(profileFields);

    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

  console.log(profileFields.chats);


});
*/

// @route GET  api/profile/me
// Get current users profile
// @access     private



/*
// @route  GET api/profile
// @desc   Get all profiles
// @access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
*/

/*

// @route  GET api/profile/user/:user_id
// @desc   Get profile by user ID
// @access Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});
*/

module.exports = router;
