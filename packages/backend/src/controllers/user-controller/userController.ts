import * as express from 'express';
import { UserService } from '../../services';
import { respond } from '../../helpers';

export class UserController {
  static async signup(req: express.Request, res: express.Response) {
    try {
      const result = await UserService.create(req.body);
      respond(res, 'success', 201, 'signup successful', result);
    } catch (error) {
      respond(res, 'error', 500, error.message);
    }
  }

  static async login(req: express.Request, res: express.Response) {
    try {
      const result = await UserService.login(req.body);
      if (!result) {
        respond(res, 'error', 401, 'invalid login credentials');
        return;
      }

      respond(res, 'success', 200, 'login successful', result);
    } catch (error) {
      respond(res, 'error', 500, error.message);
    }
  }
}
