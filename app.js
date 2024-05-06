import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import 'dotenv/config';
import routes from './routes/index.js';
import './db.js';

const { PORT = 3000 } = process.env;

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use('/api', routes);

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
