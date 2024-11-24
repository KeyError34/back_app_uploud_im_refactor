import { Sequelize } from 'sequelize';
import 'dotenv/config';
// import path from 'path';
// import fs from 'fs';
// import configData from "./config.json" assert { type: "json" };
// const configPath = path.resolve('./config/config.json');
// const configData = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
// const env = process.env.NODE_ENV || 'development';

// const config = configData[env];
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

export default sequelize;
