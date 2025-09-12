const db = require('../config/db');
const bcrypt = require('bcrypt');

exports.findByCredentials = async (email, password) => {
  // Étape 1 : récupérer l’utilisateur par email
  const result = await db.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );

  const user = result.rows[0];
  if (!user) {
    return null; // utilisateur non trouvé
  }

  // Étape 2 : comparer le mot de passe en clair avec le hash stocké
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return null; // mot de passe incorrect
  }

  // Étape 3 : retour de l’utilisateur (sans le mot de passe !)
  delete user.password;
  return user;
};
