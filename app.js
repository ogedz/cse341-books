import express from 'express';
import { getDb } from './src/db/connect.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Server is running' });
});

app.get('/trails', async (req, res) => {
  const db = getDb();
  const trails = await db.collection('trails').find().toArray();
  return res.status(200).json(trails);
});

export default app;