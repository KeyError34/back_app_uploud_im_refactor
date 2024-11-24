import 'dotenv/config';
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const router = express.Router();

// регистрация
router.post('/register', async (req, res) => {
  const { userName, email, password, adminPassword } = req.body;

  // Хэшируем пароль пользователя
  const hashedPassword = await bcrypt.hash(password, 10);
  // Хэшируем админ-пароль из переменной окружения
  const hashedAdminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  // Изначально предполагаем, что пользователь не админ
  let isAdmin = false;

  // Проверка, если передан правильный админ-пароль
  if (adminPassword === process.env.ADMIN_PASSWORD) {
    isAdmin = true; // Если пароль совпал, то флаг isAdmin ставим в true
  }

  try {
    // Создаём нового пользователя с флагом isAdmin
    const user = await User.create({
      userName,
      email,
      password: hashedPassword, // Сохраняем хэш пароля
      isAdmin, // Устанавливаем флаг админа
      adminPassword: hashedAdminPassword, // Хэшируем админ-пароль (если нужно хранить его в базе)
    });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error });
  }
});

// логин
router.post('/login', async (req, res) => {
  const { email, password, adminPassword } = req.body;

  try {
    // Находим пользователя по email
    const user = await User.findOne({ where: { email } });

    // Если пользователь не найден или пароли не совпадают
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Если передан админ-пароль, проверяем его
    if (adminPassword && adminPassword === process.env.ADMIN_PASSWORD) {
      user.isAdmin = true; // Устанавливаем флаг isAdmin в true
      await user.save(); // Сохраняем обновлённого пользователя
    }

    // Генерируем JWT токен для авторизованного пользователя
    const token = jwt.sign(
      { userId: user.id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
});

export default router;
