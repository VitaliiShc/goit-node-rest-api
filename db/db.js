import mongoose from 'mongoose';

const { DB_URI } = process.env;

mongoose
  .connect(DB_URI)
  .then(() => console.info('Database connection successfully'))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
