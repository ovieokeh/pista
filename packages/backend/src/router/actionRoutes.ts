import express from 'express';
import { ActionController } from '../controllers';
import { verifyToken, ActionValidations } from '../middlewares';

const router: express.Router = express.Router();
const { addActionValidator } = ActionValidations;

router.post('/actions', verifyToken, addActionValidator, ActionController.add);

export default router;
