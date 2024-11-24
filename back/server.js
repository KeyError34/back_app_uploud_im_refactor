import express from 'express';
import sequelize from './config/db.js';
import 'dotenv/config';
import cors from 'cors';
import {createSharedFolder} from './utils/folderUtils.js'
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import appRoutes from './routes/apps.js';
const app = express();
const port = process.env.PORT || 3334;

app.use(express.json());
app.use(cors());

createSharedFolder();

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/apps', appRoutes);

app.listen(port, async () => {
  try {
    await sequelize.authenticate();
    console.log(
      'Connection to the database has been established successfully.'
    );
     console.log(`Server is working at http://127.0.0.1:${port}`);
  } catch (error) {
    console.log('Unable to connect to the database.', error);
  }
});
