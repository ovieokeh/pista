import express from 'express';
import { UserController } from '../controllers';
import { verifyToken, UserValidations } from '../middlewares';

const router: express.Router = express.Router();
const { signupValidations, loginValidations } = UserValidations;

router.post('/signup', signupValidations, UserController.signup);
router.post('/login', loginValidations, UserController.login);
router.get('/user', verifyToken, UserController.getProfile);

export default router;
