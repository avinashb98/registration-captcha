const User = require('../models/user');
const ipUtils = require('../utils/ipUtils');

const register = async (req, res) => {
  const address = req.connection.remoteAddress;
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

  try {
    await ipUtils.updateIpRegCount(address);
  } catch (error) {
    console.log(error);
  }
};

const safetyCheckIP = async (req, res, next) => {
  const address = req.connection.remoteAddress;
  let isSafe;
  try {
    isSafe = await ipUtils.isIpSafe(address);
  } catch (error) {
    console.log(error);
    isSafe = false;
  }

  if (!isSafe) {
    res.status(401).json({
      message: 'Please include Captcha Code in your request'
    });
    return;
  }
  next();
};

module.exports = {
  register,
  safetyCheckIP
};
