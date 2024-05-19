import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes/index.js';
import path from 'node:path';
import './db/db.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use('/avatars', express.static(path.resolve('public/avatars')));

app.use('/', router);

app.use((req, res) => {
  res.status(404).send('Route not found');
});

app.use((error, req, res, next) => {
  const { status = 500, message = 'Server error' } = error;
  res.status(status).send({ message });
});

app.listen(PORT, () => {
  console.info(`Server is running. Use our API on port: ${PORT}`);
});
