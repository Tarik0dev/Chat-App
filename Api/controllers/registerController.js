const userModel = require('../models/registerModel');

exports.register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await userModel.registerCredentials(email, password);


    res.status(201).json({
      message: "✅ Utilisateur créé avec succès",
      user: result.id
    });

    
  } catch (err) {
    res.status(500).json({ message: "❌ Erreur serveur : " + err.message });
  }
};
