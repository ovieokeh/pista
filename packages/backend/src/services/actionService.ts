import { ActionModel, iAction } from '../database/models/ActionModel';

export class ActionService {
  static async create(details: iAction): Promise<iAction> {
    const result = await ActionModel.create(details);
    const action: iAction = result.dataValues;

    return action;
  }
}
