import * as express from 'express';
import { ActionService } from '../../services';
import { respond } from '../../helpers';

export class ActionController {
  static async add(req: express.Request, res: express.Response) {
    try {
      const { id: userId } = req.user;
      const result = await ActionService.create({
        userId,
        ...req.body
      });
      respond(res, 'success', 201, 'action created successfully', result);
    } catch (error) {
      respond(res, 'error', 500, error.message);
    }
  }
}
