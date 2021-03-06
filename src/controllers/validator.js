const Joi = require('joi');
const User = require('../models/user');

const userWithEmailExists = async (email) => {
  let user;
  try {
    user = await User.find({ email });
  } catch (error) {
    throw error;
  }
  if (user.length > 0) {
    return true;
  }
  return false;
};

const ValidateRegister = Joi.object().keys({
  name: Joi.string().min(3).max(30),
  password: Joi.string().regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/).required(),
  email: Joi
    .string()
    .regex(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)
    .required(),
  captchaCode: Joi.string().allow('').optional()
}).with('email', 'password');

const register = async (req, res, next) => {
  const { error, value } = ValidateRegister.validate(req.body);
  if (error) {
    console.log(error);
    res.status(400).json({
      message: 'Invalid input'
    });
    return;
  }

  if (await userWithEmailExists(value.email)) {
    res.status(400).json({
      message: 'User with this email already exists'
    });
    return;
  }

  req.parsed = value;
  next();
};

module.exports = { register };
