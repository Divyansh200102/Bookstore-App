// passwordHasher.js
const bcrypt = require('bcryptjs');

async function hashPassword(plainPassword) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(plainPassword, salt);
  console.log('Hashed password:', hashedPassword);
  return hashedPassword;
}

// Usage
hashPassword('password1').then(hash => {
  console.log('Use this hash in your database:', hash);
});