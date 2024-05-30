import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import User from '../models/userModel.js';
import HttpError from '../helpers/HttpError.js';
import sendEmail from '../helpers/sendEmailSendgrid.js';

const verifyEmailBody = (user) => {
  const html = `
    <p>You registered an account on ContactBook Application. Before being able to use your account you need to verify your email address.</p></br>
    <a target="_blank" href="${process.env.BASE_URL}/users/verify/${user.verificationToken}" rel="noopener noreferrer">Click to verify email</a>`;
  const text = `
    You registered an account on ContactBook Application. Before being able to use your account you need to verify your email address. Click to verify email: ${process.env.BASE_URL}/users/verify/${user.verificationToken}`;

  return {
    to: user.email,
    subject: 'Verify email',
    html: html,
    text: text,
  };
};

// User registration
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

  await sendEmail(verifyEmailBody(newUser));

  res.status(201).send({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    },
    message:
      'We just need to verify your email address before you can access. A verification email sent to your registration email',
  });
}

// Verification of user's email address
async function emailVerification(req, res, next) {
  const { verificationToken } = req.params;

  const user = await User.findOneAndUpdate(
    { verificationToken },
    {
      verify: true,
      verificationToken: null,
    }
  );
  if (!user) {
    throw HttpError(404, 'User not found');
  }

  res.send({
    message: 'Verification successful',
  });
}

// Resent a verification email
async function resendVerifyEmail(req, res, next) {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(404, 'User not found');
  }
  if (user.verify) {
    throw HttpError(400, 'Verification has already been passed');
  }

  await sendEmail(verifyEmailBody(user));

  res.send({
    message: 'Verification email sent',
  });
}

// User login
async function login(req, res, next) {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) {
    throw HttpError(401, 'Email or password is wrong');
  }

  if (!user.verify) {
    throw HttpError(401, 'Email not verified');
  }

  const comparePassword = await bcryptjs.compare(password, user.password);
  if (!comparePassword) {
    throw HttpError(401, 'Email or password is wrong');
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1d',
  });

  await User.findByIdAndUpdate(user._id, { token });

  res.send({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
}

// User logout
async function logout(req, res, next) {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).send();
}

export default {
  register,
  emailVerification,
  resendVerifyEmail,
  login,
  logout,
};
