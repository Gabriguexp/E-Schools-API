import {Router} from 'express';
const router = Router();
import * as examenController from '../controller/examen.controller.js'
import * as authMiddleware from '../middleware/auth.middleware.js'

router.get('/getExamenesRealizado/:idexamen', authMiddleware.verifyToken, examenController.getExamenesRealizados)

router.post('/store', authMiddleware.verifyProfesorToken, examenController.storeExamen)

router.get('/index', authMiddleware.verifyToken, examenController.indexExamen)

router.get('/checkuploadexamen/:userid/:examenid', authMiddleware.verifyToken, examenController.checkUploadedExamen)

router.get('/:cursoid/:examenid', authMiddleware.verifyToken, examenController.getExamenById)

router.put('/:examenid', authMiddleware.verifyToken, examenController.updateExamen)

router.post('/uploadExamen', authMiddleware.verifyToken, examenController.uploadExamen)

router.post('/uploadComentario', authMiddleware.verifyToken, examenController.uploadComentario)


router.get('/getExamenesNoRealizado/:idcurso/:idexamen', authMiddleware.verifyToken, examenController.getExamenesNoRealizados)

/*
router.delete('/:examenid', examenController.deleteExamen)
*/

export default router;
