import {Router} from 'express';
const router = Router();
import * as examenController from '../controller/examen.controller.js'
import * as authMiddleware from '../middleware/auth.middleware.js'

router.post('/store', authMiddleware.verifyProfesorToken, examenController.storeExamen)

router.get('/index', authMiddleware.verifyToken, examenController.indexExamen)
/*
router.get('/:examenid', examenController.getExamenById)

router.put('/:examenid', examenController.updateExamen)
*/

/*
router.delete('/:examenid', examenController.deleteExamen)
*/

export default router;
