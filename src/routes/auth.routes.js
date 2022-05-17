import {Router} from 'express';

const router = Router();
import * as authController from '../controller/auth.controller.js';
import * as authMiddleware from '../middleware/auth.middleware.js'


router.post('/login', authController.login)

router.post('/register', authController.register)

router.post('/registerProfesor', authController.registerProfesor)

router.post('/checksessiontoken', authController.checkUserLogged)

router.post('/logout', authController.logout)

router.post('/inviteUser', authMiddleware.verifyAdminToken, authController.inviteUser)

router.get('/getInvitacion/:tokenRegistro', authController.getInvitacion)

export default router;
