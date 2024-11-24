import User from './user.js';
import App from './app.js';

App.belongsTo(User, {
  foreignKey: 'userId',
  as: 'User',
});

User.hasMany(App, {
  foreignKey: 'userId',
  as: 'Apps',
});

export { User, App  };
