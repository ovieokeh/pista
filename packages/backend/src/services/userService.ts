import { UserModel, iUser } from '../database/models/UserModel';
import { auth } from '../helpers';

export interface NewUserDetails {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatarUrl?: string;
}

interface LoginDetails {
  email: string;
  password: string;
}

interface CreatedUser {
  user: iUser;
  token: string;
}

export class UserService {
  static async create(details: NewUserDetails): Promise<CreatedUser> {
    const result = await UserModel.create(details);

    const user: iUser = result.dataValues;
    delete user.password;

    const token: string = auth.generateToken(user);
    return { user, token };
  }

  static async login(
    credentials: LoginDetails
  ): Promise<CreatedUser | boolean> {
    const user: iUser | null = await this.getByEmail(credentials.email);
    if (!user) return false;

    const isPasswordMatch: boolean = auth.verifyPassword(
      credentials.password,
      user.password
    );
    if (!isPasswordMatch) return false;

    delete user.password;
    const token: string = auth.generateToken(user);

    return { user, token };
  }

  static async getByEmail(email: string): Promise<iUser | null> {
    const result = await UserModel.findOne({ where: { email } });
    if (!result) return null;

    const user: iUser = result.dataValues;

    return user;
  }
}
