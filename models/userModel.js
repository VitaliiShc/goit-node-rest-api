import { Schema, model } from 'mongoose';
import gravatar from 'gravatar';
import handleMongooseError from '../helpers/handleMongooseError.js';
import { emailRegexp } from '../helpers/regexps.js';

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 8,
      required: [true, 'Password is required'],
    },
    email: {
      type: String,
      math: emailRegexp,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    avatarURL: {
      type: String,
      default: function () {
        return gravatar.url(this.email, { s: 250 }, true);
      },
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post('save', handleMongooseError);

export default model('User', userSchema);
