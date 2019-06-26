import express from 'express';
import { BudgetController } from '../controllers';
import { verifyToken, BudgetValidations } from '../middlewares';

const router: express.Router = express.Router();
const { addBudgetValidations, viewBudgetValidations } = BudgetValidations;

router.post(
  '/budgets',
  verifyToken,
  addBudgetValidations,
  BudgetController.add
);
router.get('/budgets', verifyToken, BudgetController.getAll);
router.get('/budgets/current', verifyToken, BudgetController.getCurrent);
router.get(
  '/budgets/:budgetId',
  verifyToken,
  viewBudgetValidations,
  BudgetController.view
);
router.put('/budgets/current', verifyToken, BudgetController.completeCurrent);

export default router;
