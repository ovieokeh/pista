import express from 'express';
import { UserService } from '../services';
import { AddBudgetValidator } from './validators/addBudgetValidator';
import { validateUUID } from './validators/uuidValidator';
import { respond } from '../helpers';

export class BudgetValidations {
  static async addBudgetValidations(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    AddBudgetValidator.amount(req);
    AddBudgetValidator.startDate(req);
    AddBudgetValidator.endDate(req);

    const requestErrors = req.validationErrors(true);
    if (requestErrors) {
      respond(res, 'error', 422, 'validation error', requestErrors);
      return;
    }

    const user = await UserService.getByEmail(req.user.email);
    if (user.hasPendingBudget) {
      respond(res, 'error', 409, 'you already have a pending budget');
      return;
    }

    next();
  }

  static async viewBudgetValidations(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> {
    validateUUID('budgetId', req);

    const requestErrors = req.validationErrors(true);
    if (requestErrors) {
      respond(res, 'error', 422, 'validation error', requestErrors);
      return;
    }

    next();
  }
}
