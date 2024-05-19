import * as fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import Jimp from 'jimp';
import User from '../models/userModel.js';
import HttpError from '../helpers/HttpError.js';

async function getCurrent(req, res, next) {
  const { email, subscription, avatarURL } = req.user;

  res.send({
    email,
    subscription,
    avatarURL,
  });
}

async function updateSubscription(req, res, next) {
  const user = await User.findOneAndUpdate(
    req.user._id,
    { subscription: req.body.subscription },
    { new: true }
  );
  if (!user) {
    throw HttpError(404);
  }

  res.send({
    email: user.email,
    subscription: user.subscription,
    avatarURL: user.avatarURL,
  });
}

async function updateAvatar(req, res, next) {
  const img = await Jimp.read(req.file.path);
  await img
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
    .writeAsync(req.file.path);

  const endpointAvatarName = `${crypto.randomUUID()}-${req.file.filename}`;
  await fs.rename(
    req.file.path,
    path.resolve('public', 'avatars', endpointAvatarName)
  );

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { avatarURL: path.join('/avatars', endpointAvatarName) },
    { new: true }
  );
  if (!user) {
    throw HttpError(404);
  }

  res.send({ avatarURL: user.avatarURL });
}

export default {
  getCurrent,
  updateSubscription,
  updateAvatar,
};
