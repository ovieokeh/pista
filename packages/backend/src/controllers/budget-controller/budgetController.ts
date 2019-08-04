import * as express from 'express';
import { BudgetService } from '../../services';
import { respond } from '../../helpers';

export class BudgetController {
  static async add(req: express.Request, res: express.Response) {
    try {
      const { id: userId } = req.user;
      const result = await BudgetService.create({
        userId,
        ...req.body
      });
      respond(res, 'success', 201, 'budget created successfully', result);
    } catch (error) {
      respond(res, 'error', 500, error.message);
    }
  }

  static async view(req: express.Request, res: express.Response) {
    try {
      const { budgetId } = req.params;
      const result = await BudgetService.getById(budgetId, req.user.id);
      respond(res, 'success', 200, 'budget retrieved successfully', result);
    } catch (error) {
      respond(res, 'error', 500, error.message);
    }
  }

  static async getAll(req: express.Request, res: express.Response) {
    try {
      const { id: userId } = req.user;

      const result = await BudgetService.getAll(userId);

      respond(
        res,
        'success',
        200,
        'all budgets retrieved successfully',
        result
      );
    } catch (error) {
      respond(res, 'error', 500, error.message);
    }
  }

  static async getCurrent(req: express.Request, res: express.Response) {
    try {
      const { id: userId } = req.user;

      const result = await BudgetService.getCurrentBudget(userId);
      if (!result) {
        respond(res, 'success', 200, 'no current budget found');
        return;
      }

      respond(
        res,
        'success',
        200,
        'current budget retrieved successfully',
        result
      );
    } catch (error) {
      respond(res, 'error', 500, error.message);
    }
  }

  static async completeCurrent(req: express.Request, res: express.Response) {
    await BudgetService.markAsComplete(req.user.id);
    respond(res, 'success', 200, 'current budget completed successfully');
  }
}
