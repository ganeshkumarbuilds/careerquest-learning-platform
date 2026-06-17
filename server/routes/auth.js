const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

// ADD THIS BLOCK HERE
router.get('/leaderboard', async (req, res) => {
  try {
    console.log('Leaderboard route hit');

    const users = await User.find({})
      .select('name career xp level')
      .sort({ xp: -1 });

    console.log(users);

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;