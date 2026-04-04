const bcrypt = require('bcryptjs');

/**
 * Hash plain password.
 * @param {string} plain
 * @returns {Promise<string>}
 */
async function hashPassword(plain) {
  const configuredRounds = Number(process.env.BCRYPT_SALT_ROUNDS);
  const rounds = Number.isFinite(configuredRounds) && configuredRounds > 0
    ? configuredRounds
    : 12;
  return bcrypt.hash(plain, rounds);
}

/**
 * Compare plain and hash.
 * @param {string} plain
 * @param {string} hash
 * @returns {Promise<boolean>}
 */
async function comparePassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

module.exports = {
  hashPassword,
  comparePassword,
};
