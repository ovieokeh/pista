import * as express from 'express';
import { UserService } from '../../services';
import { respond, internalError } from '../../helpers';

export class UserController {
  static async signup(req: express.Request, res: express.Response) {
    try {
      const result = await UserService.create(req.body);
      respond(res, 'success', 201, 'signup successful', result);
    } catch (error) {
      internalError(res, error.message);
    }
  }

  static async login(req: express.Request, res: express.Response) {
    try {
      const result = await UserService.login(req.body);
      if (!result) {
        respond(res, 'error', 401, 'Invalid login credentials');
        return;
      }

      respond(res, 'success', 200, 'login successful', result);
    } catch (error) {
      internalError(res, error.message);
    }
  }

  static async getProfile(req: express.Request, res: express.Response) {
    try {
      respond(res, 'success', 200, 'profile retrieved successfully', req.user);
    } catch (error) {
      internalError(res, error.message);
    }
  }
}
