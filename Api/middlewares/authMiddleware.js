const jwt = require('jsonwebtoken');

// Middleware de vérification de token JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ message: 'Token manquant' });
  }

  // Format attendu : "Bearer <token>"
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Accès refusé, token non fourni' });
  }

  try {
    // Vérification du token avec la clé secrète
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // On ajoute les infos utilisateur à req pour les routes suivantes
    req.user = decoded;

    next(); // passage à la suite (contrôleur)
  } catch (err) {
    return res.status(401).json({ message: 'Token invalide ou expiré' });
  }
};

module.exports = verifyToken;
