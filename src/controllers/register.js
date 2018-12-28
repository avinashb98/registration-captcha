const User = require('../models/user');

const register = async (req, res) => {
  const { email, name, password } = req.parsed;
  try {
    await User.create({ email, name, password });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal Server Error',
      data: {}
    });
    return;
  }

  res.status(201).json({
    message: 'User successfully registered',
    data: {}
  });
};

module.exports = {
  register
};
