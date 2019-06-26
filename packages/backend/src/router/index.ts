import * as express from 'express';
import userRoutes from './userRoutes';
import budgetRoutes from './budgetRoutes';
import actionRoutes from './actionRoutes';
import { respond } from '../helpers';

const router: express.Router = express.Router();

router.use(userRoutes);
router.use(budgetRoutes);
router.use(actionRoutes);
router.get('*', (_, res: express.Response) => {
  respond(res, 'success', 200, 'welcome to Pista');
});

export default router;
