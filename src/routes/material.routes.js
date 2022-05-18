import {Router} from 'express';
const router = Router();
import * as materialController from '../controller/material.controller.js'
import * as authMiddleware from '../middleware/auth.middleware.js'

router.post('/store', authMiddleware.verifyProfesorToken, materialController.storeMaterial)

router.get('/:cursoid/bloques', authMiddleware.verifyToken, materialController.getBloques)

router.get('/checkuploadedtarea/:userid/:tareaid', authMiddleware.verifyToken, materialController.checkUploadedTarea)

router.get('/:cursoid/:materialid', authMiddleware.verifyToken, materialController.getMaterialById)

router.get('/:cursoid/:bloqueid/:materialid', authMiddleware.verifyToken, materialController.getMaterialByIdFromBloque)

router.put('/:cursoid/:materialid', authMiddleware.verifyProfesorToken, materialController.updateMaterial)

router.put('/:cursoid/:bloqueid/:materialid', authMiddleware.verifyProfesorToken, materialController.updateMaterialFromBloque)

router.post('/deletematerial', authMiddleware.verifyProfesorToken,materialController.deleteMaterial)

router.post('/uploadTarea',  authMiddleware.verifyToken,materialController.uploadTarea)

export default router;