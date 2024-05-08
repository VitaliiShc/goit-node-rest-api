import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import HttpError from '../helpers/HttpError.js';
import ctrlWrapper from '../helpers/ctrlWrapper.js';

const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const emailInLowerCase = email.toLowerCase();
  const isEmailInUse = await User.findOne({ email: emailInLowerCase });
  if (isEmailInUse !== null) {
    throw HttpError(409, 'Email in use');
  }
  const newUser = new User({ email });

  newUser.hashPassword(password);
  newUser.save();
  res.status(201).send({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const emailInLowerCase = email.toLowerCase();
  const user = await User.findOne({ email: emailInLowerCase });
  if (!user || !user.comparePassword(password)) {
    throw HttpError(401, 'Email or password is wrong');
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' });
  await User.findByIdAndUpdate(user._id, { token });
  res.send({
    user: {
      email: user.email,
      subscription: user.subscription,
      token,
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
