import * as express from 'express';
import user from './userRoutes';
import { respond } from '../helpers';

const router: express.Router = express.Router();

router.use(user);
router.get('*', (_, res: express.Response) => {
  respond(res, 'success', 200, 'welcome to Pista');
});

export default router;
