import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const App = sequelize.define(
  'App',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    appName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
      filePath: {
    type: DataTypes.STRING,
    allowNull: false,
  },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'Apps',
    timestamps: false,
  }
);


export default App;
