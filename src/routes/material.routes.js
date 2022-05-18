import {Router} from 'express';
const router = Router();
import * as materialController from '../controller/material.controller.js'
import * as authMiddleware from '../middleware/auth.middleware.js'

router.post('/store', materialController.storeMaterial)

router.get('/:cursoid/bloques', authMiddleware.verifyToken, materialController.getBloques)

router.get('/checkuploadedtarea/:userid/:tareaid', materialController.checkUploadedTarea)

router.get('/:cursoid/:materialid', materialController.getMaterialById)

router.get('/:cursoid/:bloqueid/:materialid', materialController.getMaterialByIdFromBloque)

router.put('/:cursoid/:materialid', materialController.updateMaterial)

router.put('/:cursoid/:bloqueid/:materialid', materialController.updateMaterialFromBloque)

router.post('/deletematerial',materialController.deleteMaterial)

router.post('/uploadTarea', materialController.uploadTarea)

export default router;