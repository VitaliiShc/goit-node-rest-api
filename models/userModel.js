import { Schema, model } from 'mongoose';
import bcryptjs from 'bcryptjs';
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
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.hashPassword = function (password) {
  this.password = bcryptjs.hashSync(password, bcryptjs.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
  return bcryptjs.compareSync(password, this.password);
};

userSchema.post('save', handleMongooseError);

export default model('User', userSchema);
