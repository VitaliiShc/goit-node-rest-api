import mongoose from 'mongoose';
import handleMongooseError from '../helpers/handleMongooseError.js';

const phoneRegexp =
  /^(\+?\d{0,3}(\s|\()?\d{1,3}(\s|\))?(\s|\-)?\d{1,3}(\s|\-)?\d{2,5}(\s|\-)?\d{2,5}(\s|\-)?)?\d{2,5}$/;

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: { type: String },
    phone: { type: String },
    favorite: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

contactSchema.post('save', handleMongooseError);

export default mongoose.model('Contact', contactSchema);
