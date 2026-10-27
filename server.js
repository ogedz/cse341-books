import app from './app.js';
import { connectToDb, getDb } from './src/db/connect.js';

const PORT = process.env.PORT;

if (!PORT) {
  throw new Error('PORT is required in .env file');
}

const startServer = async () => {
  try {
    await connectToDb();
    console.log('Connected to MongoDB');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    process.exit(1);
  }
};

startServer();