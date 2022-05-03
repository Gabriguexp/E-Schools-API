import {Router} from 'express';

const router = Router();
import * as authController from '../controller/auth.controller.js';

router.post('/login', authController.login)

router.post('/register', authController.register)

router.post('/registerProfesor', authController.registerProfesor)

router.post('/checksessiontoken', authController.checkUserLogged)

router.post('/logout', authController.logout)

export default router;
