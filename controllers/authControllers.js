import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import User from '../models/userModel.js';
import HttpError from '../helpers/HttpError.js';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

async function register(req, res, next) {
  const { email, password } = req.body;

  const isEmailInUse = await User.findOne({ email: email.toLowerCase() });
  if (isEmailInUse !== null) {
    throw HttpError(409, 'Email in use');
  }

  const hashPassword = await bcryptjs.hash(password, 10);

  const newUser = await User.create({
    email: email.toLowerCase(),
    password: hashPassword,
  });

  res.status(201).send({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
  });
}

async function login(req, res, next) {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });
  if (user === null) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const comparePassword = await bcryptjs.compare(password, user.password);
  if (comparePassword === false) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    JWT_SECRET_KEY,
    { expiresIn: '1d' }
  );

  await User.findByIdAndUpdate(user._id, { token });

  res.send({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  });
}

async function logout(req, res, next) {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).send();
}

export default {
  register,
  login,
  logout,
};
