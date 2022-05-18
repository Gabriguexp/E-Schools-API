import {Router} from 'express';
const router = Router();
import * as tareaController from '../controller/tarea.controller.js'
import * as authMiddleware from '../middleware/auth.middleware.js'

router.get('/getTareasEntregadas/:idtarea', authMiddleware.verifyToken, tareaController.getTareasEntregadas)

router.post('/calificarTarea/', authMiddleware.verifyProfesorToken, tareaController.calificarTarea)

export default router;