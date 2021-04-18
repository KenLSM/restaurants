import jwt from 'jsonwebtoken';
import { TOKEN_KEY, USERNAME_KEY, ACCESS_KEY, USER_ID_KEY } from '../Constants';

export const withUserAuth = (req, res, next) => {
  const tokenValue = req.cookies[TOKEN_KEY];
  const username = req.cookies[USERNAME_KEY];
  const userId = parseInt(req.cookies[USER_ID_KEY]);

  if (!tokenValue || !username || !userId) {
    console.log({ tokenValue, username, userid: userId });
    return res.status(403).json({ err: -1, error_msg: 'Not logged in' });
  }
  const token = jwt.verify(tokenValue, ACCESS_KEY) as { username: string; userid: number };

  if (token.username !== username && token.userid != userId) {
    console.log({ t_username: token.username, username });
    return res.status(403).json({ err: -1, error_msg: 'dunno who you' });
  }
  req.user = { username, userid: userId };
  return next();
};
