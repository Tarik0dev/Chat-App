const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.registerCredentials = async (email, password) => {
  // Vérifier si l'email existe déjà
  const result = await db.query(
    'SELECT COUNT(*) as counter FROM users WHERE email = $1',
    [email]
  );

  if (parseInt(result.rows[0].counter, 10) > 0) {
    throw new Error("L'email existe déjà, veuillez utiliser un autre email.");
  }

  // 🔐 Hasher le mot de passe avant insertion
  const hashedPassword = await bcrypt.hash(password, 10); // 10 = coût du hash

  // Insérer un nouvel utilisateur
  const insertResult = await db.query(
    'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *',
    [email, hashedPassword]
  );

  return insertResult.rows[0];
};
