import express from 'express';
import { AddActionValidator } from './validators/addActionValidator';
import { respond } from '../helpers';

export class ActionValidations {
  static async addActionValidator(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    AddActionValidator.budgetId(req);
    AddActionValidator.type(req);
    AddActionValidator.amount(req);
    AddActionValidator.note(req);

    const requestErrors = req.validationErrors(true);
    if (requestErrors) {
      respond(res, 'error', 422, 'validation error', requestErrors);
      return;
    }

    next();
  }
}
