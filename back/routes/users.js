import express from 'express';
import { authenticate } from '../middleware/auth.js';
import { checkAdmin } from '../middleware/checkAdmin.js'; // Импортируем checkAdmin
import User from '../models/user.js';

const router = express.Router();

// получение всех пользователей (только для администратора)
router.get('/', authenticate, checkAdmin, async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const offset = (page - 1) * limit;
    const users = await User.findAndCountAll({
      attributes: { exclude: ['password'] },
      limit: parseInt(limit),
      offset: parseInt(offset),
    });

    res.json({
      total: users.count,
      pages: Math.ceil(users.count / limit),
      currentPage: parseInt(page),
      users: users.rows,
    });
  } catch (error) {
    console.error('Error fetching users:', error.message);
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

// удаление пользователя (только для администратора)
router.delete('/:id', authenticate, checkAdmin, async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    // не позволять администратору удалять самого себя
    if (userId === req.user.userId) {
      return res.status(403).json({ message: 'You cannot delete yourself.' });
    }

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error.message);
    res.status(500).json({ message: 'Error deleting user', error });
  }
});

export default router;
