import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';
import bcryptjs from 'bcryptjs';

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const register = async (req, res, next) => {
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
    },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (user === null) {
    throw HttpError(401, 'Email or password is wrong');
  }
  const comparePassword = await bcryptjs.compare(password, user.password);
  if (comparePassword === false) {
    throw HttpError(401, 'Email or password is wrong');
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: '1d' });
  await User.findByIdAndUpdate(user._id, { token });
  res.send({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).send();
};

const getCurrent = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.send({
    email,
    subscription,
  });
};

const updateSubscription = async (req, res, next) => {
  const { _id } = req.user;
  const { subscription } = req.body;
  const result = await User.findOneAndUpdate(
    _id,
    { subscription },
    {
      new: true,
    }
  );
  if (!result) {
    throw HttpError(404);
  }
  res.send({
    email: result.email,
    subscription: result.subscription,
  });
};

export default {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  updateSubscription: ctrlWrapper(updateSubscription),
};
