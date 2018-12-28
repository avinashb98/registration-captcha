const Joi = require('joi');

const ValidateRegister = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(30),
  password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
  email: Joi
    .string()
    .regex(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/)
    .required()
}).with('username', 'password');

const register = (req, res, next) => {
  const { error, value } = ValidateRegister.validate(req.body);
  if (error) {
    console.log(error);
    res.status(400).json({
      message: 'Invalid input'
    });
    return;
    // next(new Error('Inputs do not meet criteria'));
  }
  req.parsed = value;
  next();
};

module.exports = { register };
