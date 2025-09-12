const userModel = require('../models/authModel');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findByCredentials(email, password);

    if (!user) {
      return res.status(401).json({ message: 'Identifiants invalides' });
    }

    // 🔑 Générer un token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email }, // payload
      process.env.JWT_SECRET,                 // clé secrète
      { expiresIn: '1h' }                     // expiration
    );

    // 🔒 Ne jamais renvoyer le mot de passe
    delete user.password;

    res.json({
      message: 'Utilisateur connecté',
      token,     // le frontend stockera ce token
      user       // infos utiles (email, nom, etc.)
    });

  } catch (err) {
    console.error('Erreur login:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
