import {Router} from 'express';
const router = Router();
import * as matriculaController from '../controller/matricula.controller.js'
import * as authMiddleware from '../middleware/auth.middleware.js'

router.post('/store', authMiddleware.verifyAdminToken, matriculaController.storeMatricula)

router.post('/storeFree', authMiddleware.verifyToken, matriculaController.storeMatricula)

router.get('/index', authMiddleware.verifyToken, matriculaController.indexMatricula)

router.get('/:matriculaid', authMiddleware.verifyToken, matriculaController.getMatriculaById)

router.get('/getmatriculabyuser/:userid', authMiddleware.verifyToken, matriculaController.getMatriculaByUser)

router.put('/:matriculaid', authMiddleware.verifyAdminToken, matriculaController.updateMatricula)

router.post('/create-checkout-session', authMiddleware.verifyToken, matriculaController.createCheckoutSession);

router.post('/confirm-payment', authMiddleware.verifyToken, matriculaController.confirmPayment);

router.post('/cancel-payment', authMiddleware.verifyToken, matriculaController.cancelPayment);

/*
router.delete('/:matriculaid', matriculaController.deleteMatricula)
*/
export default router;
