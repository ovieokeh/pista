import express from 'express';
import jwt from 'jsonwebtoken';
import { iUser } from '../database/models/UserModel';
import { UserService } from '../services';
import { respond } from '../helpers';

declare global {
  namespace Express {
    interface Request {
      user: iUser;
    }
  }
}

export async function verifyToken(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization) {
    respond(res, 'error', 401, 'no token provided');
    return;
  }

  const token: string = authorization.split(' ')[1];
  const privateKey = `${process.env.SECRET_KEY}`;

  jwt.verify(
    token,
    privateKey,
    { maxAge: '7d' },
    async (error: any, decoded: any) => {
      if (error) {
        if (error.message === 'maxAge exceeded') {
          respond(res, 'error', 401, 'token expired');
          return;
        }

        respond(res, 'error', 401, 'failed to authenticate token');
        return;
      }

      const decodedUser: iUser = { ...decoded };

      const user = await UserService.getByEmail(decodedUser.email);
      if (!user) {
        respond(res, 'error', 401, 'user not found');
        return;
      }

      req.user = user;
      next();
    }
  );
}
