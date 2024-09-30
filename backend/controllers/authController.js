const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signIn = async (req, res) => {
  const { email, password } = req.body;

  console.log(`signIn details are--->`, typeof(email), typeof(password))

  const user = await User.findOne({ email });
  console.log(`user details--->`,{user})
  if (!user) {
    console.log(`step-1`)
    return res.status(404).json({ message: 'user does not found' });
  }

  if (password !== user.password) {
    console.log(`step-2`)
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return res.json({success:true, message:"user retrieved successfully", token });
};

module.exports = { signIn };
