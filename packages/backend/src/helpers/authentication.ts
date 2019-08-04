import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { iUser } from '../database/models/UserModel';

export class auth {
  static hashPassword(password: string): string {
    const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
    const salt = bcrypt.genSaltSync(SALT_ROUNDS);

    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }

  static verifyPassword(password: string, hashPassword: string): boolean {
    return bcrypt.compareSync(password, hashPassword);
  }

  static generateToken(user: iUser): string {
    const privateKey: jwt.Secret = `${process.env.SECRET_KEY}`;
    const token = jwt.sign(user, privateKey, { expiresIn: '7d' });
    return token;
  }
}
