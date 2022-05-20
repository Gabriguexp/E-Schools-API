import {Router} from 'express';
const router = Router();
import * as tareaController from '../controller/tarea.controller.js'
import * as authMiddleware from '../middleware/auth.middleware.js'

router.get('/getTareasEntregadas/:idtarea', tareaController.getTareasEntregadas)

router.post('/calificarTarea/', tareaController.calificarTarea)

router.post('/uploadTarea',  authMiddleware.verifyToken,tareaController.uploadTarea)

export default router;
