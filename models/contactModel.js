import { Schema, model } from 'mongoose';
import handleMongooseError from '../helpers/handleMongooseError.js';
import { emailRegexp, phoneRegexp } from '../helpers/regexps.js';

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      math: emailRegexp,
      required: [true, 'Email is required'],
    },
    phone: {
      type: String,
      math: phoneRegexp,
      required: [true, 'Phone is required'],
    },
    favorite: { type: Boolean, default: false },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: [true, 'Owner is required'],
    },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleMongooseError);

export default model('Contact', contactSchema);
