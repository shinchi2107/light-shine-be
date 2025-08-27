const jwt = require('jsonwebtoken');

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'access_token_secret';
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'refresh_token_secret';

const generateTokens = (user, expiresAccessToken = "60m", expiresRefreshToken = "7d") => {
    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      accessTokenSecret,
      { expiresIn: expiresAccessToken }
    );
    const refreshToken = jwt.sign({ id: user.id, email: user.email }, refreshTokenSecret, {
      expiresIn: expiresRefreshToken
    });
  
    return { accessToken, refreshToken };
  };

const verifyAccessToken = (token) => {
    return jwt.verify(token, accessTokenSecret);
}

const verifyRefreshToken = (token) => {
    return jwt.verify(token, refreshTokenSecret);
}

module.exports = { generateTokens, verifyAccessToken, verifyRefreshToken };