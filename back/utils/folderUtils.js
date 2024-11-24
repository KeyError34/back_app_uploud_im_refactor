import fs from 'fs';
import path from 'path';
export function createUserFolder(userId) {
  const userFolderPath = path.join('uploads', userId.toString());
  if (!fs.existsSync(userFolderPath)) {
    fs.mkdirSync(userFolderPath, { recursive: true });
    console.log(`Folder for user ${userId} created.`);
  }
}
export function createSharedFolder  ()  {
  const sharedFolderPath = path.join('uploads', 'shared');
  if (!fs.existsSync(sharedFolderPath)) {
    fs.mkdirSync(sharedFolderPath, { recursive: true });
    console.log('Shared folder created.');
  }
};
