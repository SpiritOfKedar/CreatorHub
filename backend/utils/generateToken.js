const jwt = require('jsonwebtoken');

const generateToken = (id, sessionId, expiresIn = '30d') => {
  const payload = { id };
  if (sessionId) {
    payload.sessionId = sessionId;
  }

  return jwt.sign(payload, process.env.JWT_SECRET || 'secret123', {
    expiresIn,
  });
};

module.exports = generateToken;
