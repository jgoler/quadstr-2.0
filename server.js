const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes

//app.use('/api/users', require('./routes/api/users'));
//app.use('/api/auth', require('./routes/api/auth'));
//app.use('/api/profile', require('./routes/api/profile'));
//app.use('/api/posts', require('./routes/api/posts'));
//app.use('/api/chats', require('./routes/api/chats'));


app.get('/api/confirm', async (req, res) => {
  try {
    console.log("Test");
    const code = req.query.verificationString;
    const email = req.query.email;
    const user = await User.findAll({ email: email, verification: code });
    if (!user) {
      res.status(500).send('Server Error');
    }
    if (user.length > 1) {
      res.status(500).send('Server Error');
    }
    if (user.length === 1) {
      user[0].confirmed = true;
      user[0].save();
    }
    res.status(200).send('User verified');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));