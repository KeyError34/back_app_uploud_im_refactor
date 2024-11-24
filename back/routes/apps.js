import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { authenticate } from '../middleware/auth.js';
import { checkAdmin } from '../middleware/checkAdmin.js';  // Импортируем checkAdmin
import App from '../models/app.js';
import { createUserFolder } from '../utils/folderUtils.js';  // Импорт функции

const router = express.Router();

// настройка хранилища для загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Создаем папку для пользователя перед загрузкой файла
    const userFolderPath = path.join('uploads', req.user.userId.toString());
    createUserFolder(req.user.userId);  // Вызов функции для создания папки

    cb(null, userFolderPath);  // Указываем путь к папке
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// загрузка приложения (если нужно, проверка администратора)
router.post('/upload', authenticate, checkAdmin, upload.single('appFile'), async (req, res) => {
  const { appName, size } = req.body;
  const filePath = req.file.path;

  try {
    const app = await App.create({
      appName,
      size,
      filePath,
      UserId: req.user.userId,
    });
    res.status(201).json({ message: 'App uploaded successfully', app });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading app', error });
  }
});

// удаление приложения (проверка администратора)
router.delete('/:id', authenticate, checkAdmin, async (req, res) => {
  const appId = req.params.id;

  try {
    const app = await App.findOne({ where: { id: appId, UserId: req.user.userId } });

    if (!app) {
      return res.status(404).json({ message: 'App not found' });
    }

    // удаляем файл из системы
    if (fs.existsSync(app.filePath)) {
      fs.unlinkSync(app.filePath);
    }

    await app.destroy();
    res.json({ message: 'App deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting app', error });
  }
});

// получение всех приложений пользователя
router.get('/', authenticate, async (req, res) => {
  try {
    const apps = await App.findAll({ where: { UserId: req.user.userId } });
    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching apps', error });
  }
});

export default router;