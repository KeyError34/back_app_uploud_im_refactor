
export function checkAdmin(req, res, next) {
  if (req.user?.isAdmin)
    return res.status(403).json({ message: 'Access denied, admin only' });
  next();
}
