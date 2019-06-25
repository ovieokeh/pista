import express from 'express';
import { UserService } from '../services';
import { SignupValidator } from './validators/signupValidator';
import { LoginValidator } from './validators/loginValidator';
import { auth, respond } from '../helpers';

export class UserValidations {
  static async signupValidations(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    SignupValidator.firstName(req);
    SignupValidator.lastName(req);
    SignupValidator.email(req);
    SignupValidator.password(req);

    const requestErrors = req.validationErrors(true);
    if (requestErrors) {
      respond(res, 'error', 422, 'validation error', requestErrors);
      return;
    }

    const user = await UserService.getByEmail(req.body.email);
    if (user) {
      respond(res, 'error', 409, 'email already in use');
      return;
    }

    req.body.password = auth.hashPassword(req.body.password);
    next();
  }

  static async loginValidations(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    LoginValidator.email(req);
    LoginValidator.password(req);

    const requestErrors = req.validationErrors(true);
    if (requestErrors) {
      respond(res, 'error', 422, 'login unsuccessful', requestErrors);
      return;
    }

    next();
  }
}
