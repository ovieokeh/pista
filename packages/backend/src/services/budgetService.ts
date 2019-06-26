import { BudgetModel, iBudget } from '../database/models/BudgetModel';
import { ActionModel } from '../database/models/ActionModel';

export class BudgetService {
  static async create(details: iBudget): Promise<iBudget> {
    const result = await BudgetModel.create(details);
    const budget: iBudget = result.dataValues;

    return budget;
  }

  static async getById(id: string, userId: string): Promise<iBudget> {
    const result = await BudgetModel.findOne({
      where: { id, userId },
      attributes: { exclude: ['user_id'] },
      include: [
        {
          model: ActionModel,
          as: 'actions',
          attributes: { exclude: ['budget_id', 'budgetId', 'userId'] }
        }
      ]
    });
    const budget: iBudget = result.dataValues;

    return budget;
  }

  static async getAll(userId: string): Promise<iBudget[] | null> {
    const budgets = await BudgetModel.findAll({
      where: { userId },
      attributes: { exclude: ['user_id', 'userId'] },
      include: [
        {
          model: ActionModel,
          as: 'actions',
          attributes: { exclude: ['budget_id', 'budgetId', 'userId'] }
        }
      ]
    });

    return budgets;
  }

  static async getCurrentBudget(userId: string): Promise<iBudget | null> {
    const result = await BudgetModel.findOne({
      where: { userId, completed: false },
      attributes: { exclude: ['user_id', 'userId'] },
      include: [
        {
          model: ActionModel,
          as: 'actions',
          attributes: { exclude: ['budget_id', 'budgetId', 'userId'] }
        }
      ]
    });
    if (!result) return null;

    const budget: iBudget = result.dataValues;
    return budget;
  }

  static async markAsComplete(userId: string): Promise<void> {
    await BudgetModel.update(
      { completed: true },
      {
        where: { userId, completed: false }
      }
    );
  }
}
