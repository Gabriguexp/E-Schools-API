import {Router} from 'express';
const router = Router();
import * as cursoController from '../controller/curso.controller.js'
import * as examenController from '../controller/examen.controller.js'
import * as authMiddleware from '../middleware/auth.middleware.js'

router.post('/store', authMiddleware.verifyAdminToken, cursoController.storeCurso)

router.get('/index',  authMiddleware.verifyToken, cursoController.indexCurso)

router.post('/verifyName', authMiddleware.verifyAdminToken, cursoController.verifyName)

router.get('/:cursoid', authMiddleware.verifyToken, cursoController.getCursoById)

router.put('/:cursoid', authMiddleware.verifyAdminToken, cursoController.updateCurso)

router.get('/:cursoid/examen/:examenid', examenController.getExamenById)

router.put('/:cursoid/examen/:examenid', authMiddleware.verifyProfesorToken, examenController.updateExamen)



/*
router.delete('/:cursoid', cursoController.deleteCurso)
*/

export default router;
