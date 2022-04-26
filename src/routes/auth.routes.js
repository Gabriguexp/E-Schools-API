import {Router} from 'express';

const router = Router();
import * as authController from '../controller/auth.controller.js';

router.post('/login', authController.login)

router.post('/register', authController.register)

router.post('/registerProfesor', authController.registerProfesor)


export default router;
