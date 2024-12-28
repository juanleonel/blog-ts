import express, { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import { AuthController } from '../controllers/Auth.controller';
import { UserService } from '../services/user.service';

const authController = new AuthController(new UserService());

const router = express.Router();

router.get('/sign-up', (req, res) => res.render('sign-up-form'));
router.post('/sign-up', authController.signUp);
router.get('/sign-in', (req, res) => res.render('sign-in-form'));
router.post('/sign-in', authController.signIn);


export default router;
